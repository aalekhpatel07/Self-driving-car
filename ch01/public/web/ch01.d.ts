/* tslint:disable */
/* eslint-disable */
/**
*/
export class Car {
  free(): void;
/**
* @param {CarConfig} config
* @returns {Car}
*/
  withConfig(config: CarConfig): Car;
/**
* @param {number} x
* @param {number} y
* @param {number} width
* @param {number} height
*/
  constructor(x: number, y: number, width: number, height: number);
/**
*/
  update(): void;
/**
* @param {CanvasRenderingContext2D} ctx
*/
  draw(ctx: CanvasRenderingContext2D): void;
/**
*/
  config: CarConfig;
/**
*/
  control: Control;
/**
*/
  forward: boolean;
/**
*/
  readonly get_forward: boolean;
/**
*/
  readonly get_left: boolean;
/**
*/
  readonly get_reverse: boolean;
/**
*/
  readonly get_right: boolean;
/**
*/
  height: number;
/**
*/
  left: boolean;
/**
*/
  reverse: boolean;
/**
*/
  right: boolean;
/**
*/
  width: number;
/**
*/
  x: number;
/**
*/
  y: number;
}
/**
*/
export class CarConfig {
  free(): void;
/**
* @param {number} speed
* @param {number} acceleration
* @param {number} max_speed
* @param {number} friction
* @param {number} angle
* @param {number} angle_delta
*/
  constructor(speed: number, acceleration: number, max_speed: number, friction: number, angle: number, angle_delta: number);
/**
*/
  acceleration: number;
/**
*/
  angle: number;
/**
*/
  angle_delta: number;
/**
*/
  friction: number;
/**
*/
  max_speed: number;
/**
*/
  speed: number;
}
/**
*/
export class Control {
  free(): void;
/**
*/
  readonly get_forward: boolean;
/**
*/
  readonly get_left: boolean;
/**
*/
  readonly get_reverse: boolean;
/**
*/
  readonly get_right: boolean;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_carconfig_free: (a: number) => void;
  readonly __wbg_get_carconfig_angle: (a: number) => number;
  readonly __wbg_set_carconfig_angle: (a: number, b: number) => void;
  readonly __wbg_get_carconfig_angle_delta: (a: number) => number;
  readonly __wbg_set_carconfig_angle_delta: (a: number, b: number) => void;
  readonly carconfig_new: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
  readonly __wbg_car_free: (a: number) => void;
  readonly __wbg_get_car_x: (a: number) => number;
  readonly __wbg_set_car_x: (a: number, b: number) => void;
  readonly __wbg_get_car_y: (a: number) => number;
  readonly __wbg_set_car_y: (a: number, b: number) => void;
  readonly __wbg_get_car_width: (a: number) => number;
  readonly __wbg_set_car_width: (a: number, b: number) => void;
  readonly __wbg_get_car_height: (a: number) => number;
  readonly __wbg_set_car_height: (a: number, b: number) => void;
  readonly __wbg_get_car_config: (a: number) => number;
  readonly __wbg_set_car_config: (a: number, b: number) => void;
  readonly __wbg_get_car_control: (a: number) => number;
  readonly __wbg_set_car_control: (a: number, b: number) => void;
  readonly car_withConfig: (a: number, b: number) => number;
  readonly car_new: (a: number, b: number, c: number, d: number) => number;
  readonly car_get_forward: (a: number) => number;
  readonly car_get_left: (a: number) => number;
  readonly car_get_right: (a: number) => number;
  readonly car_get_reverse: (a: number) => number;
  readonly car_set_forward: (a: number, b: number) => void;
  readonly car_set_left: (a: number, b: number) => void;
  readonly car_set_right: (a: number, b: number) => void;
  readonly car_set_reverse: (a: number, b: number) => void;
  readonly __wbg_control_free: (a: number) => void;
  readonly control_get_forward: (a: number) => number;
  readonly control_get_left: (a: number) => number;
  readonly control_get_right: (a: number) => number;
  readonly control_get_reverse: (a: number) => number;
  readonly car_update: (a: number) => void;
  readonly car_draw: (a: number, b: number) => void;
  readonly __wbg_get_carconfig_speed: (a: number) => number;
  readonly __wbg_get_carconfig_acceleration: (a: number) => number;
  readonly __wbg_get_carconfig_max_speed: (a: number) => number;
  readonly __wbg_get_carconfig_friction: (a: number) => number;
  readonly __wbg_set_carconfig_speed: (a: number, b: number) => void;
  readonly __wbg_set_carconfig_acceleration: (a: number, b: number) => void;
  readonly __wbg_set_carconfig_max_speed: (a: number, b: number) => void;
  readonly __wbg_set_carconfig_friction: (a: number, b: number) => void;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
}

/**
* Synchronously compiles the given `bytes` and instantiates the WebAssembly module.
*
* @param {BufferSource} bytes
*
* @returns {InitOutput}
*/
export function initSync(bytes: BufferSource): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
