/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '@8thwall/xr' {
  interface PipelineConfig {
    canvas: HTMLCanvasElement
    allowedDevices: string
    cameraConfig?: {
      direction: 'back' | 'front'
    }
  }

  interface XrControllerConfig {
    enableWorldTracking: boolean
    enableVps: boolean
  }

  interface LocationData {
    position: GeolocationPosition
  }

  export const XR8: {
    loadPipeline: (config: PipelineConfig) => Promise<void>
    run: (config: PipelineConfig) => void
    stop: () => void
    XrController: {
      configure: (config: XrControllerConfig) => void
    }
    GeoLocationController: {
      onLocationUpdate: (callback: (data: LocationData) => void) => void
    }
    XrDevice: {
      ANY: string
    }
  }
}

interface XrControllerConfig {
  enableWorldTracking?: boolean
  enableVps?: boolean
  imageTargets?: string[]
}

interface XR8Type {
  loadPipeline: (config: PipelineConfig) => Promise<void>
  run: (config: PipelineConfig) => void
  stop: () => void
  XrController: {
    configure: (config: XrControllerConfig) => void
  }
  GeoLocationController: {
    onLocationUpdate: (callback: (data: LocationData) => void) => void
  }
  XrDevice: {
    ANY: string
  }
}

interface AFrameComponent {
  schema?: Record<string, unknown>
  init?: () => void
  update?: (oldData: any) => void
  tick?: () => void
  remove?: () => void
  pause?: () => void
  play?: () => void
}

interface AFrameSystem {
  schema?: Record<string, unknown>
  init?: () => void
  tick?: () => void
}

interface AFramePrimitive {
  defaultComponents?: Record<string, unknown>
  mappings?: Record<string, string>
}

interface AFrame {
  registerComponent: (name: string, component: AFrameComponent) => void
  registerSystem: (name: string, system: AFrameSystem) => void
  registerPrimitive: (name: string, primitive: AFramePrimitive) => void
}

declare global {
  interface Window {
    XR8?: XR8Type
    AFRAME: AFrame
  }
}

export {}
