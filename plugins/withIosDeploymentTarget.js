const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

// Plugin ini memaksa SEMUA target di Podfile untuk menggunakan iOS 16.0
// Ini adalah solusi paling ampuh untuk error "only available in iOS 16.0 or newer"
const withIosDeploymentTarget = (config) => {
  return withDangerousMod(config, [
    'ios',
    async (config) => {
      const podfilePath = path.join(config.modRequest.projectRoot, 'ios', 'Podfile');
      let content = fs.readFileSync(podfilePath, 'utf8');

      const deploymentTarget = '16.0';
      
      // Menambahkan hook post_install untuk memaksa versi di setiap target
      if (!content.includes('config.build_settings[\'IPHONEOS_DEPLOYMENT_TARGET\'] = \'' + deploymentTarget + '\'')) {
        const postInstallHook = `
    installer.generated_projects.each do |project|
      project.targets.each do |target|
        target.build_configurations.each do |config|
          config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '${deploymentTarget}'
        end
      end
    end`;

        if (content.includes('post_install do |installer|')) {
          content = content.replace(
            'post_install do |installer|',
            `post_install do |installer|${postInstallHook}`
          );
        } else {
          content += `\npost_install do |installer|${postInstallHook}\nend\n`;
        }
        fs.writeFileSync(podfilePath, content);
      }
      return config;
    },
  ]);
};

module.exports = withIosDeploymentTarget;
