const { withDangerousMod, withXcodeProject } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

/**
 * Plugin ini menyalin file Swift App Intents langsung ke dalam
 * MAIN APP TARGET (bukan Pod), sehingga parameter token seperti
 * \(.todoText) bisa berjalan dengan benar.
 */
const withAppIntentsInMainTarget = (config) => {
  // Step 1: Salin file Swift ke folder ios/myapp/
  config = withDangerousMod(config, [
    'ios',
    async (config) => {
      const projectName = config.modRequest.projectName;
      const projectRoot = config.modRequest.projectRoot;
      
      // Folder tujuan: ios/myapp/ (main app target)
      const destDir = path.join(projectRoot, 'ios', projectName);
      
      // File sumber dari modul kita
      const sourceDir = path.join(projectRoot, 'modules', 'simple-intent', 'ios');
      
      // Salin hanya file Intent (bukan Module yang butuh ExpoModulesCore)
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

  // Step 2: Daftarkan file ke Xcode project agar ikut dikompilasi
  config = withXcodeProject(config, async (config) => {
    const xcodeProject = config.modResults;
    const projectName = config.modRequest.projectName;
    
    const filesToAdd = ['SimpleIntent.swift'];
    
    for (const file of filesToAdd) {
      // Cek apakah sudah terdaftar
      const alreadyExists = xcodeProject.hasFile(`${projectName}/${file}`);
      if (!alreadyExists) {
        xcodeProject.addSourceFile(
          `${projectName}/${file}`,
          { target: xcodeProject.getFirstTarget().uuid }
        );
        console.log(`[AppIntents Plugin] Registered ${file} in Xcode project`);
      }
    }
    
    return config;
  });

  return config;
};

module.exports = withAppIntentsInMainTarget;
