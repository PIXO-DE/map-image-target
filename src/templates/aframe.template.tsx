import { useEffect } from 'react'

// Type definitions for component, system, and primitive registration
type AFrameRegistryItem = {
  name: string
  val: any // Define more specific types based on component structure if known
}

type AFrameSceneProps = {
  sceneHtml: string
  imageTargets?: string[]
  components?: AFrameRegistryItem[]
  systems?: AFrameRegistryItem[]
  primitives?: AFrameRegistryItem[]
}

// Helper functions to ensure A-Frame components, systems, and primitives are only registered once
const registeredComponents = new Set<string>()
const registerComponents = (components: AFrameRegistryItem[]) => {
  components.forEach(({ name, val }) => {
    if (registeredComponents.has(name)) return
    registeredComponents.add(name)
    window.AFRAME.registerComponent(name, val)
  })
}

const registeredSystems = new Set<string>()
const registerSystems = (systems: AFrameRegistryItem[]) => {
  systems.forEach(({ name, val }) => {
    if (registeredSystems.has(name)) return
    registeredSystems.add(name)
    window.AFRAME.registerSystem(name, val)
  })
}

const registeredPrimitives = new Set<string>()
const registerPrimitives = (primitives: AFrameRegistryItem[]) => {
  primitives.forEach(({ name, val }) => {
    if (registeredPrimitives.has(name)) return
    registeredPrimitives.add(name)
    window.AFRAME.registerPrimitive(name, val)
  })
}

// React component for managing an A-Frame scene
const AFrameScene = ({
  sceneHtml,
  imageTargets,
  components,
  systems,
  primitives
}: AFrameSceneProps) => {
  useEffect(() => {
    // Configure XR8 image targets if specified
    if (imageTargets && window?.XR8) {
      window.XR8.XrController.configure({ imageTargets })
    }

    // Register A-Frame components, systems, and primitives if provided
    if (components) {
      registerComponents(components)
    }
    if (systems) {
      registerSystems(systems)
    }
    if (primitives) {
      registerPrimitives(primitives)
    }

    // Insert the A-Frame scene HTML into the document body
    const htmlElement = document.getElementsByTagName('html')[0]
    const originalHtmlClass = htmlElement.className
    document.body.insertAdjacentHTML('beforeend', sceneHtml)

    // Cleanup function to remove the A-Frame scene on component unmount
    return () => {
      const aScene = document.getElementsByTagName('a-scene')[0]
      if (aScene && aScene.parentNode) {
        aScene.parentNode.removeChild(aScene)
      }
      htmlElement.className = originalHtmlClass
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}

// Constant to disable image targets
const DISABLE_IMAGE_TARGETS: string[] = []

export { AFrameScene, DISABLE_IMAGE_TARGETS }
