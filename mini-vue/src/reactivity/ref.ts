import { hasChanged, isObject } from "../shared";
import { isTracking, trackEffects, triggerEffects } from "./effect";
import { reactive } from "./reactive";

class RefImpl {
    private _value:any;
    private _rawValue:any;
    public dep;
    public __v_isRef: boolean
    constructor(value) {
        this._rawValue = value
        this._value = convert(value);
        this.dep = new Set();
        this.__v_isRef = true
    }
    get value() {
        if (isTracking()) {
            trackEffects(this.dep)
        }
        return this._value;
    }
    set value(newValue) {
        if (hasChanged(newValue, this._rawValue)) {
            this._rawValue = newValue;
            this._value = convert(newValue);
            triggerEffects(this.dep)
        }
    }
}

function convert(value) {
    return isObject(value) ? reactive(value) : value;
}

export function ref(value) {
    return new RefImpl(value)
}

export function isRef(ref) {
    return !!ref.__v_isRef;
}

export function unRef(ref) {
    return isRef(ref) ? ref.value : ref;
} 