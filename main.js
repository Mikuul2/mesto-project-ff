(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-13",headers:{authorization:"d04a1b4e-8173-4fa0-b847-411d73a9419f","Content-Type":"application/json"}};function t(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function n(n,o,r,c){var a=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),i=a.querySelector(".card__like-button"),u=a.querySelector(".card__delete-button"),s=a.querySelector(".card__image"),l=a.querySelector(".card__like-counter");return a.querySelector(".card__title").textContent=n.name,s.src=n.link,s.alt=n.name,l.textContent=n.likes.length,u.classList.add("visually-hidden"),n.owner._id===c&&u.classList.remove("visually-hidden"),n.likes.find((function(e){return e._id===c}))&&i.classList.add("card__like-button_is-active"),u.addEventListener("click",(function(){o(a,n._id)})),s.addEventListener("click",(function(){r(n)})),i.addEventListener("click",(function(){!function(n,o,r){n.classList.contains("card__like-button_is-active")?function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))}(o).then((function(){n.classList.remove("card__like-button_is-active"),r.textContent=Number(r.textContent)-1})).catch((function(e){console.log(e)})):function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then((function(e){return t(e)}))}(o).then((function(){n.classList.add("card__like-button_is-active"),r.textContent=Number(r.textContent)+1})).catch((function(e){console.log(e)}))}(i,n._id,l)})),a}function o(n,o){var r;(r=o,fetch("".concat(e.baseUrl,"/cards/").concat(r),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))).then((function(){n.remove()})).catch((function(e){console.log(e)}))}function r(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",a),e.addEventListener("click",i)}function c(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",a),e.removeEventListener("click",i)}function a(e){"Escape"===e.key&&c(document.querySelector(".popup_is-opened"))}function i(e){e.target===e.currentTarget&&c(e.target)}function u(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?t.classList.remove("".concat(n.inactiveButtonClass)):t.classList.add("".concat(n.inactiveButtonClass))}function s(e,t){var n=e.querySelectorAll("".concat(t.inputSelector)),o=e.querySelectorAll(".".concat(t.errorClass));n.forEach((function(e){e.classList.contains("".concat(t.inputErrorClass))&&(e.classList.remove("".concat(t.inputErrorClass)),o.forEach((function(e){e.textContent="",e.classList.remove("".concat(t.errorClass))})))}))}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}var d=document.querySelector(".places__list"),f=document.querySelector(".popup_type_edit"),m=document.querySelectorAll(".popup__close"),p=document.querySelector(".popup_type_new-card"),v=document.querySelector(".profile__edit-button"),y=document.querySelector(".profile__add-button"),_=document.querySelector(".popup_type_image"),h=document.querySelector(".popup__image"),b=document.querySelector(".popup__caption"),S=document.querySelector(".profile__title"),C=document.querySelector(".profile__description"),L=document.querySelector(".profile__image"),E=document.querySelector(".profile__image"),q=document.querySelector(".popup_type_new-avatar"),g=document.forms["edit-profile"],k=document.forms["new-place"],x=document.forms["new-avatar"],w={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function A(e,t){t.querySelector("".concat(w.submitButtonSelector)).textContent=e?"Сохранение...":"Сохранить"}function U(e){r(_),h.src=e.link,h.alt=e.name,b.textContent=e.name}v.addEventListener("click",(function(){var e,t,n;g.elements.name.value=S.textContent,g.elements.description.value=C.textContent,t=(e=g).elements.name,n=e.elements.description,t.value=S.textContent,n.value=C.textContent,s(g,w),r(f)})),E.addEventListener("click",(function(){x.reset(),s(x,w),r(q)})),y.addEventListener("click",(function(){r(p)})),m.forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){c(t)}))})),function(e){Array.from(document.querySelectorAll("".concat(e.formSelector))).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll("".concat(t.inputSelector))),o=e.querySelector("".concat(t.submitButtonSelector));u(n,o,t),n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove("".concat(n.inputErrorClass)),o.classList.remove("".concat(n.errorClass)),o.textContent=""}(e,t,n):function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add("".concat(o.inputErrorClass)),r.textContent=n,r.classList.add("".concat(o.errorClass))}(e,t,t.validationMessage,n)}(e,r,t),u(n,o,t)}))}))}(t,e)}))}(w),g.addEventListener("submit",(function(n){n.preventDefault();var o,r,a=document.forms["edit-profile"],i=a.elements.name.value,u=a.elements.description.value;A(!0,a),(o=i,r=u,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:"".concat(o),about:"".concat(r)})})).then((function(e){return S.textContent=i,C.textContent=u,c(f),t(e)})).catch((function(e){console.log("Ошибка: ".concat(e))})).finally((function(){A(!1,a)}))})),k.addEventListener("submit",(function(r){r.preventDefault();var a=document.forms["new-place"],i=a.elements["place-name"].value,u=a.elements.link.value,l=a.querySelector("".concat(w.submitButtonSelector));A(!0,a),function(t,n){return fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:"".concat(t),link:"".concat(n)})})}(i,u).then((function(e){return t(e)})).then((function(e){d.prepend(n(e,o,U,e.owner._id)),c(p),a.reset(),s(a,w),l.classList.add("".concat(w.inactiveButtonClass))})).catch((function(e){console.log("Ошибка: ".concat(e))})).finally((function(){A(!1,a)}))})),x.addEventListener("submit",(function(n){n.preventDefault();var o,r=document.forms["new-avatar"],a=r.elements.link.value,i=r.querySelector("".concat(w.submitButtonSelector));A(!0,r),(o=a,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:"".concat(o)})})).then((function(e){return E.style.backgroundImage="url('".concat(a,"')"),c(q),r.reset(),i.classList.add("".concat(w.inactiveButtonClass)),t(e)})).catch((function(e){console.log("Ошибка: ".concat(e))})).finally((function(){A(!1,r)}))})),Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then((function(e){return t(e)})),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then((function(e){return t(e)}))]).then((function(e){var t,r,c,a=(c=2,function(e){if(Array.isArray(e))return e}(r=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,c,a,i=[],u=!0,s=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(o=c.call(n)).done)&&(i.push(o.value),i.length!==t);u=!0);}catch(e){s=!0,r=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(s)throw r}}return i}}(r,c)||function(e,t){if(e){if("string"==typeof e)return l(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?l(e,t):void 0}}(r,c)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=a[0],u=a[1];t=i,S.textContent=t.name,C.textContent=t.about,L.style.backgroundImage="url('".concat(t.avatar,"')"),function(e,t){e.forEach((function(e){!function(e){d.append(e)}(n(e,o,U,t))}))}(u,i._id)})).catch((function(e){console.log(e)}))})();