/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
    for (let i = 0; i < count; i++) {
        // Создаем новый элемент с указанным тегом
        const element = document.createElement(tag);
        // Добавляем в него текстовое содержимое
        element.textContent = content;
        // Вставляем элемент в конец body
        document.body.append(element);
    }
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
export function generateTree(childrenCount, level) {
    // Вспомогательная функция для создания одного узла (рекурсия)
    function createNode(currentLevel) {
        const div = document.createElement('div');
        // Задаем класс item_1, item_2 и т.д.
        div.className = `item_${currentLevel}`;

        // Если мы еще не достигли нужной глубины, создаем потомков
        if (currentLevel < level) {
            for (let i = 0; i < childrenCount; i++) {
                // Рекурсивно создаем детей следующего уровня
                const child = createNode(currentLevel + 1);
                div.append(child);
            }
        }

        return div;
    }

    // Запускаем создание дерева с первого уровня
    return createNode(1);
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
    // Создаем дерево (2 элемента в каждом, глубина 3)
    const root = generateTree(2, 3);

    // Находим все элементы второго уровня внутри нашего дерева
    const nodesToReplace = root.querySelectorAll('.item_2');

    // Проходим по каждому найденному узлу и заменяем его
    nodesToReplace.forEach((node) => {
        // Создаем новый тег section
        const section = document.createElement('section');

        // Переносим класс из старого div в новый section
        section.className = node.className;

        // Переносим всех детей из старого div в новый section
        // Оператор ... разворачивает коллекцию childNodes в отдельные аргументы
        section.append(...node.childNodes);

        // Заменяем старый div на новый section прямо в дереве
        node.replaceWith(section);
    });

    // Возвращаем измененное дерево
    return root;
}
