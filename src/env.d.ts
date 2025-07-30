interface ImportMeta {
  readonly glob: (
    patterns: string | readonly string[],
    opts?: { eager?: boolean; as?: 'raw' }
  ) => Record<string, () => Promise<string>>
}