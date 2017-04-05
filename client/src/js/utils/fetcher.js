/**
 * @module fetcher
 * @description 封装的公共方法
 * @author wing
 */

import 'whatwg-fetch';
import url from 'url';

const publicToken = PUBLIC_TOKEN;

export const get = (api, param) => fetch(
    url.format({
        pathname: api,
        query: param || {}
    }),
    {
        headers: {
            Authorization: `Bearer ${publicToken}`
        }
    }
);

export const getP = (api, param) => fetch(
  url.format({
    pathname: api,
    query: param || {},
  }),
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('iustudio_token')}`,
    },
  }
)

export const post = (api, param) => fetch(api, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${publicToken}`,
  },
  body: JSON.stringify(param),
});

export const postP = (api, param) => fetch(api, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('iustudio_token')}`,
  },
  body: JSON.stringify(param),
});  

export const onSuccess = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((json) => {
    throw new Error(`${CODE_MAP[json.code]}：${json.msg}`);
  });
};

export const onError = (msg) => () => {
  throw new Error(`${msg || '操作失败'}，请检查网络设置。`);
};
