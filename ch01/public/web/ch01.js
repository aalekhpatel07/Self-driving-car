
let wasm;

const cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8Memory0;
function getUint8Memory0() {
    if (cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function getObject(idx) { return heap[idx]; }

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

let WASM_VECTOR_LEN = 0;

const cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachedInt32Memory0;
function getInt32Memory0() {
    if (cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}

let stack_pointer = 32;

function addBorrowedObject(obj) {
    if (stack_pointer == 1) throw new Error('out of js stack');
    heap[--stack_pointer] = obj;
    return stack_pointer;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}
/**
*/
export class Car {

    static __wrap(ptr) {
        const obj = Object.create(Car.prototype);
        obj.ptr = ptr;

        return obj;
    }

    toJSON() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            config: this.config,
            control: this.control,
            get_forward: this.get_forward,
            get_left: this.get_left,
            get_right: this.get_right,
            get_reverse: this.get_reverse,
        };
    }

    toString() {
        return JSON.stringify(this);
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_car_free(ptr);
    }
    /**
    */
    get x() {
        const ret = wasm.__wbg_get_car_x(this.ptr);
        return ret;
    }
    /**
    */
    set x(arg0) {
        wasm.__wbg_set_car_x(this.ptr, arg0);
    }
    /**
    */
    get y() {
        const ret = wasm.__wbg_get_car_y(this.ptr);
        return ret;
    }
    /**
    */
    set y(arg0) {
        wasm.__wbg_set_car_y(this.ptr, arg0);
    }
    /**
    */
    get width() {
        const ret = wasm.__wbg_get_car_width(this.ptr);
        return ret;
    }
    /**
    */
    set width(arg0) {
        wasm.__wbg_set_car_width(this.ptr, arg0);
    }
    /**
    */
    get height() {
        const ret = wasm.__wbg_get_car_height(this.ptr);
        return ret;
    }
    /**
    */
    set height(arg0) {
        wasm.__wbg_set_car_height(this.ptr, arg0);
    }
    /**
    */
    get config() {
        const ret = wasm.__wbg_get_car_config(this.ptr);
        return CarConfig.__wrap(ret);
    }
    /**
    */
    set config(arg0) {
        _assertClass(arg0, CarConfig);
        var ptr0 = arg0.ptr;
        arg0.ptr = 0;
        wasm.__wbg_set_car_config(this.ptr, ptr0);
    }
    /**
    */
    get control() {
        const ret = wasm.__wbg_get_car_control(this.ptr);
        return Control.__wrap(ret);
    }
    /**
    */
    set control(arg0) {
        _assertClass(arg0, Control);
        var ptr0 = arg0.ptr;
        arg0.ptr = 0;
        wasm.__wbg_set_car_control(this.ptr, ptr0);
    }
    /**
    * @param {CarConfig} config
    * @returns {Car}
    */
    withConfig(config) {
        const ptr = this.__destroy_into_raw();
        _assertClass(config, CarConfig);
        var ptr0 = config.ptr;
        config.ptr = 0;
        const ret = wasm.car_withConfig(ptr, ptr0);
        return Car.__wrap(ret);
    }
    /**
    * @param {number} x
    * @param {number} y
    * @param {number} width
    * @param {number} height
    */
    constructor(x, y, width, height) {
        const ret = wasm.car_new(x, y, width, height);
        return Car.__wrap(ret);
    }
    /**
    */
    get get_forward() {
        const ret = wasm.car_get_forward(this.ptr);
        return ret !== 0;
    }
    /**
    */
    get get_left() {
        const ret = wasm.car_get_left(this.ptr);
        return ret !== 0;
    }
    /**
    */
    get get_right() {
        const ret = wasm.car_get_right(this.ptr);
        return ret !== 0;
    }
    /**
    */
    get get_reverse() {
        const ret = wasm.car_get_reverse(this.ptr);
        return ret !== 0;
    }
    /**
    */
    set forward(forward) {
        wasm.car_set_forward(this.ptr, forward);
    }
    /**
    */
    set left(left) {
        wasm.car_set_left(this.ptr, left);
    }
    /**
    */
    set right(right) {
        wasm.car_set_right(this.ptr, right);
    }
    /**
    */
    set reverse(reverse) {
        wasm.car_set_reverse(this.ptr, reverse);
    }
    /**
    */
    update() {
        wasm.car_update(this.ptr);
    }
    /**
    * @param {CanvasRenderingContext2D} ctx
    */
    draw(ctx) {
        try {
            wasm.car_draw(this.ptr, addBorrowedObject(ctx));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
}
/**
*/
export class CarConfig {

    static __wrap(ptr) {
        const obj = Object.create(CarConfig.prototype);
        obj.ptr = ptr;

        return obj;
    }

    toJSON() {
        return {
            speed: this.speed,
            acceleration: this.acceleration,
            max_speed: this.max_speed,
            friction: this.friction,
            angle: this.angle,
            angle_delta: this.angle_delta,
        };
    }

    toString() {
        return JSON.stringify(this);
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_carconfig_free(ptr);
    }
    /**
    */
    get speed() {
        const ret = wasm.__wbg_get_car_x(this.ptr);
        return ret;
    }
    /**
    */
    set speed(arg0) {
        wasm.__wbg_set_car_x(this.ptr, arg0);
    }
    /**
    */
    get acceleration() {
        const ret = wasm.__wbg_get_car_y(this.ptr);
        return ret;
    }
    /**
    */
    set acceleration(arg0) {
        wasm.__wbg_set_car_y(this.ptr, arg0);
    }
    /**
    */
    get max_speed() {
        const ret = wasm.__wbg_get_car_width(this.ptr);
        return ret;
    }
    /**
    */
    set max_speed(arg0) {
        wasm.__wbg_set_car_width(this.ptr, arg0);
    }
    /**
    */
    get friction() {
        const ret = wasm.__wbg_get_car_height(this.ptr);
        return ret;
    }
    /**
    */
    set friction(arg0) {
        wasm.__wbg_set_car_height(this.ptr, arg0);
    }
    /**
    */
    get angle() {
        const ret = wasm.__wbg_get_carconfig_angle(this.ptr);
        return ret;
    }
    /**
    */
    set angle(arg0) {
        wasm.__wbg_set_carconfig_angle(this.ptr, arg0);
    }
    /**
    */
    get angle_delta() {
        const ret = wasm.__wbg_get_carconfig_angle_delta(this.ptr);
        return ret;
    }
    /**
    */
    set angle_delta(arg0) {
        wasm.__wbg_set_carconfig_angle_delta(this.ptr, arg0);
    }
    /**
    * @param {number} speed
    * @param {number} acceleration
    * @param {number} max_speed
    * @param {number} friction
    * @param {number} angle
    * @param {number} angle_delta
    */
    constructor(speed, acceleration, max_speed, friction, angle, angle_delta) {
        const ret = wasm.carconfig_new(speed, acceleration, max_speed, friction, angle, angle_delta);
        return CarConfig.__wrap(ret);
    }
}
/**
*/
export class Control {

    static __wrap(ptr) {
        const obj = Object.create(Control.prototype);
        obj.ptr = ptr;

        return obj;
    }

    toJSON() {
        return {
            get_forward: this.get_forward,
            get_left: this.get_left,
            get_right: this.get_right,
            get_reverse: this.get_reverse,
        };
    }

    toString() {
        return JSON.stringify(this);
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_control_free(ptr);
    }
    /**
    */
    get get_forward() {
        const ret = wasm.control_get_forward(this.ptr);
        return ret !== 0;
    }
    /**
    */
    get get_left() {
        const ret = wasm.control_get_left(this.ptr);
        return ret !== 0;
    }
    /**
    */
    get get_right() {
        const ret = wasm.control_get_right(this.ptr);
        return ret !== 0;
    }
    /**
    */
    get get_reverse() {
        const ret = wasm.control_get_reverse(this.ptr);
        return ret !== 0;
    }
}

async function load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function getImports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        const ret = getStringFromWasm0(arg0, arg1);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbg_setfillStyle_a0bd3a7496c1c5ae = function(arg0, arg1) {
        getObject(arg0).fillStyle = getObject(arg1);
    };
    imports.wbg.__wbg_beginPath_996aa2e0e610ea8f = function(arg0) {
        getObject(arg0).beginPath();
    };
    imports.wbg.__wbg_fill_86ef462953b4d991 = function(arg0) {
        getObject(arg0).fill();
    };
    imports.wbg.__wbg_rect_f193de62b8bba74f = function(arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).rect(arg1, arg2, arg3, arg4);
    };
    imports.wbg.__wbg_restore_2eda799771bbdaf3 = function(arg0) {
        getObject(arg0).restore();
    };
    imports.wbg.__wbg_save_88e5b8eebd3f0de5 = function(arg0) {
        getObject(arg0).save();
    };
    imports.wbg.__wbg_rotate_a756fbbe1a13cb2e = function() { return handleError(function (arg0, arg1) {
        getObject(arg0).rotate(arg1);
    }, arguments) };
    imports.wbg.__wbg_translate_3b6341171a005432 = function() { return handleError(function (arg0, arg1, arg2) {
        getObject(arg0).translate(arg1, arg2);
    }, arguments) };
    imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
        const ret = debugString(getObject(arg1));
        const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    return imports;
}

function initMemory(imports, maybe_memory) {

}

function finalizeInit(instance, module) {
    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;
    cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);


    return wasm;
}

function initSync(bytes) {
    const imports = getImports();

    initMemory(imports);

    const module = new WebAssembly.Module(bytes);
    const instance = new WebAssembly.Instance(module, imports);

    return finalizeInit(instance, module);
}

async function init(input) {
    if (typeof input === 'undefined') {
        input = new URL('ch01_bg.wasm', import.meta.url);
    }
    const imports = getImports();

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    initMemory(imports);

    const { instance, module } = await load(await input, imports);

    return finalizeInit(instance, module);
}

export { initSync }
export default init;
