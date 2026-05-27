/**
 * Animated backgrounds — import from `@/components/backgrounds`.
 *
 * Usage:
 *   <AnimatedBackground variant="landing" intensity="normal" style="both" />
 *   <AdminPanelBackground className="fixed inset-0 z-0" />  // admin dashboard only
 *   <AuthHeroBackground variant="auth" />                   // login hero panel
 */

export { default as AnimatedBackground } from './AnimatedBackground'
export { default as AdminPanelBackground } from './AdminPanelBackground'
export { default as AuthHeroBackground } from './AuthHeroBackground'
export { default as ColorOverlay } from './ColorOverlay'
export { default as PanelBackground } from './PanelBackground'
export { default as PageBackground } from './PageBackground'

// Layers (advanced / custom compositions)
export { default as GalaxyBackground } from './GalaxyBackground'
export { default as AdminFlowAmbient } from './AdminFlowAmbient'
export { default as AmbientColorWash } from './AmbientColorWash'
export { default as MeshNetworkBackground } from './MeshNetworkBackground'
export { default as PolygonBackground } from './PolygonBackground'

// Presets (shape data — edit to tune animations)
export { polygonPresets } from '@/constants/polygonBackgroundPresets'
export { meshPresets } from '@/constants/meshNetworkPresets'

/** @deprecated Use AuthHeroBackground */
export { default as AuthHeroShapes } from './AuthHeroBackground'
