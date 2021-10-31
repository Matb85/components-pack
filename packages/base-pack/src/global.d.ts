declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VIEWER_TRANSITION_SPEED: number;
    }
  }
}

export {};
