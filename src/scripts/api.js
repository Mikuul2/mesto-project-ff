// конфигурация запроса на сервер
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-13',
  headers: {
    authorization: 'd04a1b4e-8173-4fa0-b847-411d73a9419f',
    'Content-Type': 'application/json'
  }
}

// проверка ответа сервера и преобразование из json
function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`); 
  } 
  return res.json();
} 

// запрос на получение данных карточек
function getInitialCards () {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => {
      return getResponseData(res);
    });
} 

// запрос на получение данных профиля
function getUserInfo () {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(res => {
      return getResponseData(res);
    });
}

// запрос на изменение данных профиля
function patchProfileData (name, description) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: `${name}`,
      about: `${description}`
    })
  });
}

//  запрос на отправку данных новой карточки
function postNewCard (cardName, cardLink) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: `${cardName}`,
      link: `${cardLink}`
    })
  });
}

// запрос на удаление новой карточки
function deleteNewCard (id) {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(res => {
      return getResponseData(res);
    });
}

// запрос на постановку нового лайка
function putCardsLike (id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(res => {
      return getResponseData(res);
    });
  }

// запрос на удаление нового лайка
function deleteCardsLike (id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(res => {
      return getResponseData(res);
    });
}

// запрос обновление аватара пользователя
function patchProfileAvatar (avatarImg) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: `${avatarImg}`,
    })
  });
}

export {getUserInfo, getInitialCards, patchProfileData, postNewCard, deleteNewCard, putCardsLike, deleteCardsLike, patchProfileAvatar, getResponseData};