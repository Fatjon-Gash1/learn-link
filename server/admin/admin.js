const configureAdminJS = async (app) => {
    // Dynamically import AdminJS
    const { default: AdminJS } = await import('adminjs').catch((err) => {
      console.error('Failed to import AdminJS:', err);
      process.exit(1); // Exit the process if AdminJS import fails
    });
  
    // Import AdminJSExpress
    const { default: AdminJSExpress } = await import('@adminjs/express').catch((err) => {
      console.error('Failed to import AdminJSExpress:', err);
      process.exit(1); // Exit the process if AdminJSExpress import fails
    });
  
    // Create an instance of AdminJS with your desired options
    const admin = new AdminJS({
    });
  
    // Build the AdminJS router
    const adminRouter = AdminJSExpress.buildRouter(admin);
  
    // Mount the AdminJS router on your Express application
    app.use(admin.options.rootPath, adminRouter);
  };
  
  module.exports = configureAdminJS;
  