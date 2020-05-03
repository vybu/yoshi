export type InitialModuleConfig = Partial<ModuleConfig>;

export interface ModuleConfig {
  moduleId: string;
  routeNamespace: string;
  topology: Record<string, { artifactId: string }>;
}

export type InitialPageConfig = Partial<PageConfig>;

export interface PageConfig {
  componentId: string;
  componentName: string;
}

export type InitialExportedComponentConfig = Partial<ExportedComponentConfig>;

export interface ExportedComponentConfig {
  componentId: string;
}

export type InitialMethodConfig = Partial<MethodConfig>;

export interface MethodConfig {
  methodId: string;
}
