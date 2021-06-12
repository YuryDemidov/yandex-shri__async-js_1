# Домашнее задание ШРИ по теме "Асинхронность"

Установка необходимых модулей:
```
    npm i
```

Компиляция typescript:
```
    npm run compile
```

Запуск тестов в Node JS
```
    npm run test:mocha
```

Запуск тестов в браузере (старт сервера на порту 3000)
```
    npm run test:browser
```

Вам дан асинхронный API, реализующий арифметические действия, операции сравнения и операции над элементами массива. Каждый метод API последним аргументом принимает callback, который будет вызван после окончания асинхронного действия. В файле [example.html](example.html) можно посмотреть примеры использования.

- [код асинхронного API](https://github.com/dima117/shri-async-hw/blob/master/shri-async-hw.js)
- [код примера использования](https://github.com/dima117/shri-async-hw/blob/master/example.html)

## Задания

Нужно написать функцию, которая реализует задание вашего варианта. Массивами, математическими операциями и операциями сравнения пользоваться нельзя. Код нужно разместить на отдельной страничке и выложить её на GitHub Pages.

### Вариант 9

Реализовать операцию [reduce](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) для асинхронного массива.

```ts
function reduce(
    array: AsyncArray,
    fn: (acc: any, cur: any, idx: Number, src: AsyncArray) => any,
    initialValue: any,
    cb: (result: any) => void) {

}
```

## Бонусное задание

Реализовать в отдельном файле собственную версию методов:

- [Promise.any](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise/any)
- [Promise.allSettled](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)
- [Promise.prototype.finally](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally)

```js
Promise._any = // реализация
Promise._allSettled = // реализация
Promise.prototype._finally = // реализация
```
