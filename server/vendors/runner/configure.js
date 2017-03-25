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
    IUStudioMock._models = {};
    const defines = [];
    findModule(MODEL_PATH, (model, file) => {
        // 定义模型
        const definition = model.definition;
        if(definition) {
            _.each((definition), (field) => {
                const type = field.type.toUpperCase();
                if(type === 'UUID') {
                    field.defaultValue = Sequelize.UUIDV4;
                }
                field.type = Sequelize[type];
            });

            const Model = IUStudioMock.sequelize.define(file, model.definition);
            defines.push(Model.sync());
            // 绑定模型方法的this到Model
            _.functions(model).forEach((func) => {
                model[func] = model[func].bind(Model);
            })
        }
        Object.assign(IUStudioMock._models, { [file]: model })
    });
    IUStudioMock.getModel = function(modelName) {
        return IUStudioMock._models[modelName];
    };

    IUStudioMock.logger.info('-----Configure Models-----');
    Promise.all(defines).then(() => {
        IUStudioMock.logger.info('-----Configuring Models Ok!-----');
        cb();
    }).catch((error) => {
        console.log(error);
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
    findModule(ROUTES_PATH, (module, file) => {
        IUStudioMock._routes[file] = module;
    })
    return IUStudioMock;
}


/**
 * 配置日志
 */
function configureLogger() {
    // 检查是否有logs文件夹，没有则创建
    conft logPath = path.join(__dirname, '../../logs');
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
            filename: path.join(__dirname, '../../logs/app.log',
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
 * 配置错误捕获
 * @param app
 */
function configureErrorHandling(app) {
    app.on('error', function(err) {
        IUStudioMock.logger.error('[app] server error', err);
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
/**
 * db: {
        host: '127.0.0.1',
        port: '3306',
        usr: 'root',
        password: 'wing',
        database: 'iustudiomock',
        dialect: 'mysql'
    }
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
        configureErrorHandling(app);
        _.flow([
            configureConfig,
            configureDb,
            configureServices,
            configureMoules,
            configureRoutes
        ])(IUStudioMock);
        configureModels(IUStudioMock, cb);
    }
}