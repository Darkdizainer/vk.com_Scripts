/*********************************************************
— VK Чекер групп в одной сессии
— Данный скрипт асинхронно проверяет массив ссылок с группами Вконтакте, собирает с них информацию об имени сообщества, кол-ве подписчиков, датах последних публикаций, кол-ве последних просмотров публикаций.
— Дополнительно проверяется наличие комментариев.
— По итогу работы в консоль выводится лог, в конце работы на страницу через метод document.body.innerHTML выводится итоговая таблица с результатами.
— Скрипт запускаетя во вкладке с загруженной страницей vk.com, авторизация должна быть пройдена.
— Задержка между переходами по ссылкам 3 секунды
*************************************************************/
// Добавляем свой массив ссылок, вставляем в консоль, жмем энтер, вконце работы будет выведена таблица с результатами.

// v 0.0.2 добавляем поля даты публикаций и просмотры последних постов группы
// Массив с проверяемыми ссылками
let linksArr = ['https://vk.com/sadypridoniya', 'https://vk.com/orchardo', 'https://vk.com/agronom365', 'https://vk.com/yellowcapuchin72', 'https://vk.com/dacha_plus_mag', 'https://vk.com/prohobbi_ru', 'https://vk.com/olifurussia', 'https://vk.com/dachniu_sezon', 'https://vk.com/hogwarts_plants', 'https://vk.com/gk.karex', 'https://vk.com/sad_i_me4ty', 'https://vk.com/plantazia', 'https://vk.com/cvety_togliatti', 'https://vk.com/happyboxspb', 'https://vk.com/flonowkazan', 'https://vk.com/flowers__rostov', 'https://vk.com/cvety_perm', 'https://vk.com/club140207194', 'https://vk.com/mamaonlinevk', 'https://vk.com/sadovaja_feya', 'https://vk.com/public108591086', 'https://vk.com/home_sad', 'https://vk.com/public96942565', 'https://vk.com/eruditcluby', 'https://vk.com/sad_my', 'https://vk.com/public85036334', 'https://vk.com/dacha_zhizn', 'https://vk.com/flowering__garden', 'https://vk.com/fan_handmade', 'https://vk.com/dacha_7', 'https://vk.com/domvsaduua', 'https://vk.com/yulialitus', 'https://vk.com/home_garden', 'https://vk.com/spicami_v', 'https://vk.com/domashnii_yut', 'https://vk.com/public70829394', 'https://vk.com/dver_leto', 'https://vk.com/sewing_kids', 'https://vk.com/forum_vosaduli', 'https://vk.com/ogorodurozhay', 'https://vk.com/kakposhit', 'https://vk.com/fashiondesign1', 'https://vk.com/dacha_expert', 'https://vk.com/handmadebusiness', 'https://vk.com/svetlana_koptseva', 'https://vk.com/handmadedecor_ru', 'https://vk.com/uudacha', 'https://vk.com/ramonakey', 'https://vk.com/flor_art', 'https://vk.com/det_sad_net', 'https://vk.com/flower_alley', 'https://vk.com/le_tricotage', 'https://vk.com/rucodeliya_club', 'https://vk.com/floristcenter1', 'https://vk.com/club18957540', 'https://vk.com/your.handmade', 'https://vk.com/handmadeacademy', 'https://vk.com/tvoi_sad', 'https://vk.com/horsovetu', 'https://vk.com/royalflowers', 'https://vk.com/handmadings', 'https://vk.com/sew.easy', 'https://vk.com/dostavka_cvetov_samara', 'https://vk.com/club25003643', 'https://vk.com/moigryadki', 'https://vk.com/public79316683', 'https://vk.com/club49563525', 'https://vk.com/magnoliahm', 'https://vk.com/kali_laska', 'https://vk.com/foamiran', 'https://vk.com/magic_childhood', 'https://vk.com/portal_7ya_ru', 'https://vk.com/w.place', 'https://vk.com/womens_house', 'https://vk.com/lovesefamily', 'https://vk.com/public_handmade', 'https://vk.com/vk_mamochki', 'https://vk.com/club29746763', 'https://vk.com/roditeli_i', 'https://vk.com/interiorme', 'https://vk.com/vk_mamochki', 'https://vk.com/my_dacha', 'https://vk.com/h_cook', 'https://vk.com/luckydacha', 'https://vk.com/na_dache', 'https://vk.com/kraskigiznivse', 'https://vk.com/club135361326', 'https://vk.com/usadba_cheese', 'https://vk.com/public42815344', 'https://vk.com/cvetowoz', 'https://vk.com/tvoivykrojki', 'https://vk.com/club99278545', 'https://vk.com/worldhandrucodelie', 'https://vk.com/rukodelie.dlya.doma', 'https://vk.com/homeideaz', 'https://vk.com/datschameister', 'https://vk.com/podelkinadachy', 'https://vk.com/stroimsnamispb', 'https://vk.com/club69165032', 'https://vk.com/pro_dachu_vk', 'https://vk.com/ogorodlife', 'https://vk.com/ideall_dom', 'https://vk.com/clover_flower', 'https://vk.com/moya_usadba', 'https://vk.com/7granei'];
let groupFinArr = []; // Создаем пустой массив для хранения результатов

async function checkLinks(linksArr) {
    for (let i = 0; i < linksArr.length; i++) { // Перебираем все ссылки в массиве linksArr
        let link = linksArr[i];
        let groupObj = {}; // Создаем пустой объект для хранения информации о текущей группе
        groupObj['gr-link'] = link; // Сохраняем ссылку в объекте
        await fetch(link) // Получаем содержимое страницы по ссылке
            .then(response => {
                if (response.status === 404) { // Проверяем статус ответа
                    console.log(link + ' - 404 страница не найдена'); // Если страница не найдена, выводим сообщение в консоль
                    return;
                }
                return response.arrayBuffer(); // Если страница найдена, получаем ее содержимое в виде ArrayBuffer
            })
            .then(buffer => {
                if (!buffer) return; // Если содержимое страницы не получено, пропускаем эту ссылку
                let decoder = new TextDecoder('windows-1251'); // Создаем декодер для преобразования ArrayBuffer в строку с указанием кодировки
                let text = decoder.decode(buffer); // Преобразуем ArrayBuffer в строку
                let parser = new DOMParser(); // Создаем парсер для преобразования строки в HTML-документ
                let doc = parser.parseFromString(text, 'text/html'); // Преобразуем строку в HTML-документ
                let nameElem = doc.querySelector('h1.page_name');
                if (nameElem) { // Проверяем, что элемент найден
                    groupObj['gr-name'] = nameElem.textContent; // Получаем текст из элемента и сохраняем его в объекте
                } else { // Если элемент не найден
                    console.log('На странице ошибка'); // Выводим сообщение в консоль
                    return; // Пропускаем эту ссылку и переходим к следующей
                }
                let membersElem = doc.querySelector('span.header_count.fl_l');
                if (membersElem) { // Проверяем, что элемент найден
                    groupObj['gr-members'] = membersElem.textContent; // Получаем текст из элемента и сохраняем его в объекте
                } else { // Если элемент не найден
                    console.log('На странице ошибка'); // Выводим сообщение в консоль
                    return; // Пропускаем эту ссылку и переходим к следующей
                }
                let commentBlock = doc.querySelector('div.comment._comment'); // Ищем элемент div с классами comment и _comment на странице
                if (commentBlock) { // Если элемент найден
                    groupObj['gr-comment'] = 'ДА'; // Сохраняем значение 'ДА' в объекте
                } else { // Если элемент не найден
                    groupObj['gr-comment'] = 'НЕТ'; // Сохраняем значение 'НЕТ' в объекте
                }
                let viewsElems = doc.querySelectorAll('span._views'); // Получаем все элементы span с классом _views на странице
                let viewsArr = []; // Создаем пустой массив для хранения значений из этих элементов
                for (let elem of viewsElems) { // Перебираем все найденные элементы
                    viewsArr.push(elem.textContent); // Добавляем текст из текущего элемента в массив
                }
                groupObj['gr-views'] = viewsArr.join(', '); // Соединяем значения из массива в строку с разделителем ', ' и сохраняем ее в объекте
                let dateElems = doc.querySelectorAll('span.rel_date'); // Получаем все элементы span с классом rel_date на странице
                let dateArr = []; // Создаем пустой массив для хранения значений из этих элементов
                for (let elem of dateElems) { // Перебираем все найденные элементы
                    dateArr.push(elem.textContent); // Добавляем текст из текущего элемента в массив
                }
                let timeElems = doc.querySelectorAll('time.PostHeaderSubtitle__item'); // Получаем все элементы time с классом PostHeaderSubtitle__item на странице
                for (let elem of timeElems) { // Перебираем все найденные элементы
                    dateArr.push(elem.textContent); // Добавляем текст из текущего элемента в массив
                }
                groupObj['gr-date'] = dateArr.join('; '); // Соединяем значения из массива в строку с разделителем '; ' и сохраняем ее в объекте
            });
        if (Object.keys(groupObj).length > 1) { // Проверяем, что объект не пустой (содержит больше одного поля)
            groupFinArr.push(groupObj); // Добавляем объект в массив groupFinArr
            console.log(`Проверено: ${i + 1} ссылок из ${linksArr.length}`); // Выводим сообщение в консоль с информацией о количестве проверенных ссылок
        }
        await new Promise(resolve => setTimeout(resolve, 3000)); // Делаем паузу в 3 секунды перед переходом к следующей ссылке
    }
    let table = '<table><tr><th>Ссылка</th><th>Название</th><th>Участники</th><th>Комментарии</th><th>Просмотров у постов</th><th>Дата публикации постов</th></tr>'; // Создаем строку с началом таблицы и заголовками столбцов
    for (let group of groupFinArr) { // Перебираем все объекты в массиве groupFinArr
        table += `<tr><td><a href="${group['gr-link']}" target="_blank">${group['gr-link']}</a></td><td>${group['gr-name']}</td><td>${group['gr-members']}</td><td>${group['gr-comment']}</td><td>${group['gr-views']}</td><td>${group['gr-date']}</td></tr>`; // Добавляем строку в таблицу с данными из текущего объекта
    }
    table += '</table>'; // Заканчиваем таблицу
    document.body.innerHTML = table; // Вставляем таблицу в тело страницы, заменяя его текущее содержимое
}

checkLinks(linksArr);
