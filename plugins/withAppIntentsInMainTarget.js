const { withDangerousMod, withXcodeProject } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');


const withAppIntentsInMainTarget = (config) => {

  config = withDangerousMod(config, [
    'ios',
    async (config) => {
      const projectName = config.modRequest.projectName;
      const projectRoot = config.modRequest.projectRoot;
      
      const destDir = path.join(projectRoot, 'ios', projectName);
      
      const sourceDir = path.join(projectRoot, 'modules', 'simple-intent', 'app-intents');
      
      const filesToCopy = ['SimpleIntent.swift'];
      
      for (const file of filesToCopy) {
        const src = path.join(sourceDir, file);
        const dest = path.join(destDir, file);
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, dest);
          console.log(`[AppIntents Plugin] Copied ${file} to main target`);
        }
      }
      
      return config;
    },
  ]);

  const { IOSConfig } = require('@expo/config-plugins');

  config = withXcodeProject(config, async (config) => {
    const xcodeProject = config.modResults;
    const projectName = config.modRequest.projectName;
    
    const filesToAdd = ['SimpleIntent.swift'];
    
    for (const file of filesToAdd) {
      const filePath = `${projectName}/${file}`;
      
      IOSConfig.XcodeUtils.addBuildSourceFileToGroup({
        filepath: filePath,
        groupName: projectName,
        project: xcodeProject,
      });
      
      console.log(`[AppIntents Plugin] Registered ${file} in Xcode project using Expo utils`);
    }
    
    return config;
  });

  return config;
};

module.exports = withAppIntentsInMainTarget;
