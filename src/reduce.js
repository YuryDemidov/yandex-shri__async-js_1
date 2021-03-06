var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
import './shri-async-hw.js';
var _a = globalThis.Homework, add = _a.add, subtract = _a.subtract, lessOrEqual = _a.lessOrEqual;
export default function reduce(array, fn, initialValue, cb) {
    var _this = this;
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var arrayLength, arrayLastIndex, accumulator, array_1, array_1_1, item, e_1_1;
        var e_1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4, new Promise(function (resolve) {
                        array.length(function (result) { return resolve(result); });
                    })];
                case 1:
                    arrayLength = _b.sent();
                    return [4, new Promise(function (resolve) {
                            subtract(arrayLength, 1, function (result) { return resolve(result); });
                        })];
                case 2:
                    arrayLastIndex = _b.sent();
                    accumulator = initialValue;
                    if (!array[Symbol.asyncIterator]) {
                        array[Symbol.asyncIterator] = function () {
                            return {
                                current: 0,
                                last: arrayLastIndex,
                                next: function () {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var currentValue, isNotDone, value, _a;
                                        var _this = this;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0: return [4, new Promise(function (resolve) {
                                                        array.get(_this.current, function (result) { return resolve(result); });
                                                    })];
                                                case 1:
                                                    currentValue = _b.sent();
                                                    return [4, new Promise(function (resolve) {
                                                            lessOrEqual(_this.current, _this.last, function (result) { return resolve(result); });
                                                        })];
                                                case 2:
                                                    isNotDone = _b.sent();
                                                    if (!isNotDone) return [3, 4];
                                                    value = {
                                                        value: currentValue,
                                                        index: this.current
                                                    };
                                                    _a = this;
                                                    return [4, new Promise(function (resolve) { return add(_this.current, 1, function (result) { return resolve(result); }); })];
                                                case 3:
                                                    _a.current = _b.sent();
                                                    return [2, {
                                                            done: false,
                                                            value: value
                                                        }];
                                                case 4: return [2, {
                                                        done: true,
                                                        value: undefined
                                                    }];
                                            }
                                        });
                                    });
                                }
                            };
                        };
                    }
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 8, 9, 14]);
                    array_1 = __asyncValues(array);
                    _b.label = 4;
                case 4: return [4, array_1.next()];
                case 5:
                    if (!(array_1_1 = _b.sent(), !array_1_1.done)) return [3, 7];
                    item = array_1_1.value;
                    accumulator = fn(accumulator, item.value, item.index, array);
                    _b.label = 6;
                case 6: return [3, 4];
                case 7: return [3, 14];
                case 8:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3, 14];
                case 9:
                    _b.trys.push([9, , 12, 13]);
                    if (!(array_1_1 && !array_1_1.done && (_a = array_1.return))) return [3, 11];
                    return [4, _a.call(array_1)];
                case 10:
                    _b.sent();
                    _b.label = 11;
                case 11: return [3, 13];
                case 12:
                    if (e_1) throw e_1.error;
                    return [7];
                case 13: return [7];
                case 14:
                    cb(accumulator);
                    return [2, accumulator];
            }
        });
    }); })();
}
