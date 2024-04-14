const configureAdminJS = async (app) => {
    // Dynamically import AdminJS
    const { default: AdminJS } = await import('adminjs').catch((err) => {
      console.error('Failed to import AdminJS:', err);
      process.exit(1);
    });
  
    // Dynamically Import AdminJSExpress
    const { default: AdminJSExpress } = await import('@adminjs/express').catch((err) => {
      console.error('Failed to import AdminJSExpress:', err);
      process.exit(1);
    });
  
    const admin = new AdminJS({
    });
  
    const adminRouter = AdminJSExpress.buildRouter(admin);
  
    app.use(admin.options.rootPath, adminRouter);
  };
  
  module.exports = configureAdminJS;
  
