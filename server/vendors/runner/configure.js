/**
 * @module vendors/runner/configure
 * @description 配置runner
 * @author wing
 */

const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const log4js = require('log4js');
const Sequelize = require('sequelize');

const env = require(`../../config/env/${process.env.NODE_ENV || 'development'}`);

const MODEL_PATH = path.join(__dirname, '../../models');
const MODULE_PATH = path.join(__dirname, '../../modules');
const SERVICE_PATH = path.join(__dirname, '../services');
const ROUTES_PATH = path.join(__dirname, '../../routes');
const CONTROLLERS_PATH = path.join(__dirname, '../../controllers');
const CONSTANTS_PATH = path.join(__dirname, '../../constants');

/**
 * 递归遍历目录，获得模块
 * @param basepath
 * @param cb
 * @private
 */

function findModule(basepath, cb) {
    try {
        fs.accessSync(basepath);
    } catch (e) {
        fs.mkdir(basepath);
    }
    (function getModule(dir) {
        const files = fs.readdirSync(dir);
        if(files) {
            files.forEach(file => {
                const filePath = path.join(dir, file);
                const isDirectory = fs.statSync(filePath).isDirectory();
                if(isDirectory) {
                    getModule(filePath);
                } else {
                    if(/\.js$/.test(file)) {
                        const module = require(filePath);
                        cb(module, file.replace(/.js$/, ''), filePath);
                    }
                }
            })
        }
    })(basepath);
}

/**
 * 配置模型
 * @param IUStudioMock
 * @param cb
 */
function configureModels(IUStudioMock, cb) {
   const relations = {};
   IUStudioMock._models = {};
   const defines = [];
   findModule(MODEL_PATH, (model, file) => {
       const { definition, relation, hooks } = model;
       if(definition) {
           _.each(definition, (field) => {
               const type = field.type.toUpperCase();
               const limit = field.limit;
               switch(type) {
                   case 'UUID':
                       field.defaultValue = Sequelize.UUIDV4;
                       break;
               }
               if(limit) {
                   field.type = _.isArray(limit) ? Sequelize[type].call(null, limit) : Sequelize[type](limit);
                   delete field.limit;
               }else {
                   field.type = Sequelize[type];
               }
           })
           // 定义模型
           const Model = IUStudioMock.sequelize.define(file, model.definition, {hooks});
           if(relation) {
               relations[file] = relation;
           }
           IUStudioMock._models[file] = Model;
       }
   });

   // 校正关系
   _.each(IUStudioMock._models, (model, key) => {
       if(relations.hasOwnProperty(key)) {
           const { type, linkTo } = relations[key];
           if(type && linkTo) {
               model[type](IUStudioMock._models[linkTo]);
           }
       }
       defines.push(model.sync());
   })

   // 构建各个模型间关系
   IUStudioMock.getModel = function(modelName) {
       return IUStudioMock._models[modelName];
   }

   IUStudioMock.logger.info('--Configuring Models');
   Promise.all(defines).then(() => {
       IUStudioMock.logger.info('--Configuring Models Successful!');
       cb();
   }).catch((err) => {
       console.log(err);
   })
}

/**
 * 配置系统服务 
 * @param IUStudioMock
 */

function configureServices(IUStudioMock) {
    findModule(SERVICE_PATH, (service, file) => {
        IUStudioMock[file] = service;
    })
    return IUStudioMock;
}

/**
 * 配置全局模块
 * param aURL
 */
function configureMoules(IUStudioMock) {
    IUStudioMock._modules = [];
    findModule(MODULE_PATH, (module, file) => {
        IUStudioMock._modules[file] = module;
    })
    IUStudioMock.getModule = function(moduleName) {
        return IUStudioMock._modules[moduleName];
    }
    return IUStudioMock;
}

/**
 * 配置路由
 * @param IUStudioMock
 */
function configureRoutes(IUStudioMock) {
    IUStudioMock._routes = {};
    findModule(ROUTES_PATH, (module, file, filePath) => {
        // 考虑目录的二级结构
        const names = filePath.split(path.sep);
        const len = names.length;
        const role = names[len - 2];
        IUStudioMock._routes[`${role}/${file}`] = module;
    })
    return IUStudioMock;
}

/**
 * 配置控制器
 * @param IUStudioMock
 */
function configureControllers(IUStudioMock) {
    IUStudioMock._controllers = {};
    findModule(CONTROLLERS_PATH, (module, file, filePath) => {
        const names = filePath.split(path.sep);
        const len = names.length;
        const role = names[len - 2];
        IUStudioMock._controllers[`${role}/${file}`] = module;
    })
    return IUStudioMock;
}

/**
 * 配置常量
 * @param IUStudioMock
 */
function configureConstants(IUStudioMock) {
    findModule(CONSTANTS_PATH, (constant, file) => {
        const key = `$${file}`;
        console.log('key', key);
        IUStudioMock[key] = constant;
    })
    return IUStudioMock;
}

/**
 * 配置日志
 */
function configureLogger() {
    // 检查是否有logs文件夹，没有则创建
    const logPath = path.join(__dirname, '../../logs');
    if(!fs.existsSync(logPath)) {
        fs.mkdirSync(logPath);
    }
    const appenders = [
        {
            type: 'file',
            filename: path.join(__dirname, '../../logs/montior.log'),
            maxLogSize: 20480,
            backups: 10,
            category: 'cluster'
        }, 
        {
            type: 'console',
            category: 'cluster'
        }, 
        {
            type: 'file',
            filename: path.join(__dirname, '../../logs/app.log'),
            maxLogSize: 20480,
            backups: 10,
            category: 'app'
        }
    ];

    log4js.configure({
        appenders,
        replacaConsole: false
    })
}

/**
 * 配置全局配置
 * @param IUStudioMock
 */
function configureConfig(IUStudioMock) {
    IUStudioMock.config = env;
    return IUStudioMock;
}

/**
 * 配置数据库
 * @param IUStudioMock
 */

function configureDb(IUStudioMock) {
    const {database, host, port, user, password, dialect} = IUStudioMock.config.db;
    IUStudioMock.sequelize = new Sequelize(
        database,
        user,
        password,
        {
            port,
            host,
            dialect
        }
    );

    return IUStudioMock;
}

module.exports = {
    run(app, cb) {
        global.IUStudioMock = {};
        configureLogger();
        _.flow([
            configureConfig,
            configureConstants,
            configureDb,
            configureServices,
            configureMoules,
            configureRoutes,
            configureControllers
        ])(IUStudioMock);
        configureModels(IUStudioMock, cb);
    }
}