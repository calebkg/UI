export const APP_CONSTANTS = {
  STORAGE_KEYS: {
    AUTH_TOKEN: 'auth_token',
    REFRESH_TOKEN: 'refresh_token',
    CURRENT_USER: 'current_user',
    USER_PREFERENCES: 'user_preferences'
  },
  
  API_ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      LOGOUT: '/auth/logout',
      REFRESH: '/auth/refresh',
      RESET_PASSWORD: '/auth/reset-password'
    },
    USERS: {
      PROFILE: '/users/profile',
      UPDATE_PROFILE: '/users/profile'
    },
    ACTIVITY_REQUESTS: {
      LIST: '/activity-requests',
      CREATE: '/activity-requests',
      UPDATE: '/activity-requests',
      DELETE: '/activity-requests'
    },
    LEAVE_APPLICATIONS: {
      LIST: '/leave-applications',
      CREATE: '/leave-applications',
      UPDATE: '/leave-applications',
      DELETE: '/leave-applications'
    },
    FILES: {
      UPLOAD: '/files/upload',
      DOWNLOAD: '/files/download'
    }
  },
  
  PERMISSIONS: {
    ACTIVITY_REQUESTS: {
      VIEW: 'activity_requests.view',
      CREATE: 'activity_requests.create',
      UPDATE: 'activity_requests.update',
      DELETE: 'activity_requests.delete'
    },
    LEAVE_APPLICATIONS: {
      VIEW: 'leave_applications.view',
      CREATE: 'leave_applications.create',
      UPDATE: 'leave_applications.update',
      DELETE: 'leave_applications.delete',
      APPROVE: 'leave_applications.approve'
    },
    USERS: {
      VIEW: 'users.view',
      UPDATE: 'users.update',
      DELETE: 'users.delete'
    }
  },
  
  ROLES: {
    ADMIN: 'admin',
    MANAGER: 'manager',
    EMPLOYEE: 'employee',
    HR: 'hr',
    FINANCE: 'finance'
  },
  
  STATUS: {
    ACTIVITY_REQUESTS: {
      OPEN: 'Open',
      PENDING: 'Pending',
      APPROVED: 'Approved',
      REJECTED: 'Rejected',
      COMPLETED: 'Completed'
    },
    LEAVE_APPLICATIONS: {
      PENDING: 'Pending',
      APPROVED: 'Leave Granted',
      REJECTED: 'Rejected',
      CANCELLED: 'Cancelled'
    }
  },
  
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [5, 10, 25, 50, 100]
  },
  
  FILE_UPLOAD: {
    MAX_SIZE: 50 * 1024 * 1024, // 50MB
    ALLOWED_TYPES: ['pdf', 'png', 'jpg', 'jpeg', 'doc', 'docx'],
    CHUNK_SIZE: 1024 * 1024 // 1MB chunks for large file uploads
  }
};

export const ERROR_MESSAGES = {
  VALIDATION: {
    REQUIRED: 'This field is required',
    INVALID_EMAIL: 'Please enter a valid email address',
    INVALID_EMPLOYEE_NUMBER: 'Employee number must be in format ABC_123',
    INVALID_CURRENCY: 'Please select a valid currency',
    NOT_POSITIVE: 'Value must be greater than 0',
    INVALID_DATE_RANGE: 'End date must be after start date',
    FILE_TOO_LARGE: 'File size exceeds maximum allowed size',
    INVALID_FILE_TYPE: 'File type not allowed'
  },
  API: {
    NETWORK_ERROR: 'Network error. Please check your connection.',
    SERVER_ERROR: 'Server error. Please try again later.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
    FORBIDDEN: 'Access denied.',
    NOT_FOUND: 'Resource not found.',
    VALIDATION_ERROR: 'Please check your input and try again.'
  }
};