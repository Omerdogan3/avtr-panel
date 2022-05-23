export const NOTIF_TYPES = {
  ERROR: "error",
  WARNING: "warning",
  SUCCESS: "success"
}

export const TITLE_CONSTANTS = {
  "error": "Error!",
  "warning": "Warning!",
  "success": "Success"
}

export const ERROR_CONSTANTS = {
  NETWORK_ERROR: "Network Error",
  AUTH_ERROR: "Authentication error",
  GAME_CREATION: "There was an error during creating the game. Close your adblocker & try again.",
  REWARD_CREATION: "There was an error during creating the reward."
}

export const IMAGE_UPLOAD_TYPES = {
  THUMBNAIL: "thumbnail",
  PROMOTED_IMAGE: "promotedImage"
}

export const DRAWER_TYPES = {
  NEW_GAME: "NEW_GAME",
  NEW_REWARD: "NEW_REWARD",
  NEW_USER: "NEW_USER",
  NEW_CLAIM: "NEW_CLAIM",
}

export const USER_ROLES = {
  "ADMIN": {
    pageAccess: ["dashboard", "apps", "games", "appDetail", "trends", "panelUsers", "users", "userDetails"]
  },
  "MARKETING": {
    pageAccess: ["dashboard", "trends", "games"]
  },
  "MODERATOR": {
    pageAccess: ["dashboard", "trends"]
  },
  "TESTER": {
    pageAccess: ["dashboard"]
  },
}

export const EVENT_TYPES = {
  "DOWNLOAD": {
    "value": "DOWNLOAD",
    displayComparison: false
  },
  "HIGH_SCORE": {
    "value": "HIGH_SCORE",
    displayComparison: true
  },
  "LEVEL_UP": {
    "value": "LEVEL_UP",
    displayComparison: true
  },
  "READ_CHAPTER": {
    "value": "READ_CHAPTER",
    displayComparison: true
  },
  "SCAN_BARCODE": {
    "value": "SCAN_BARCODE",
    displayComparison: true
  },
  "SIGN_IN": {
    "value": "SIGN_IN",
    displayComparison: false,
  },
  "DISPLAY_ANONYMOUS_STORY": {
    "value": "DISPLAY_ANONYMOUS_STORY",
    displayComparison: true
  }
}

export const COMPARISON_TYPES = {
  EQUAL: {
    value: "EQUAL",
    label: "Equal"
  },
  SMALLER_EQ: {
    value: "SMALLER_EQ",
    label: "Smaller or Equal"
  },
  BIGGER_EQ: {
    value: "BIGGER_EQ",
    label: "Bigger or Equal"
  },
  ANY: {
    value: "ANY",
    label: "Any"

  } 
}