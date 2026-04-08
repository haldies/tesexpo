const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

const withIosDeploymentTarget = (config) => {
  return withDangerousMod(config, [
    'ios',
    async (config) => {
      const podfilePath = path.join(config.modRequest.projectRoot, 'ios', 'Podfile');
      let content = fs.readFileSync(podfilePath, 'utf8');

      const deploymentTarget = '16.0';
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
