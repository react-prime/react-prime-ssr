export const PORT = process.env.PORT || 3000;
export const NODE_ENV = (process.env.NODE_ENV == null || process.env.NODE_ENV === 'development') ? 'development' : 'production';
export const APP_ENV = process.env.APP_ENV || 'development';
