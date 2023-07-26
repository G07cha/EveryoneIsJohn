/** @type {Detox.DetoxConfig} */
module.exports = {
  testRunner: {
    args: {
      $0: 'jest',
      config: 'e2e/jest.config.js',
    },
    jest: {
      setupTimeout: 120000,
    },
  },
  apps: {
    'ios.debug': {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Debug-iphonesimulator/EveryoneIsJohn.app',
      build:
        'xcodebuild -workspace ios/EveryoneIsJohn.xcworkspace -scheme EveryoneIsJohn -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build',
    },
    'ios.release': {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Release-iphonesimulator/EveryoneIsJohn.app',
      build:
        'xcodebuild -workspace ios/EveryoneIsJohn.xcworkspace -scheme EveryoneIsJohn -configuration Release -sdk iphonesimulator -derivedDataPath ios/build',
    },
    // Some of the basic interactions in Android are unreliable at times when run with Detox (see https://github.com/wix/Detox/issues/1185 and https://github.com/wix/Detox/issues/3762),
    // hence ignoring Android platform until better days
    // 'android.debug': {
    //   type: 'android.apk',
    //   binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
    //   build: 'cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug',
    //   reversePorts: [8081],
    // },
    // 'android.release': {
    //   type: 'android.apk',
    //   binaryPath: 'android/app/build/outputs/apk/release/app-release.apk',
    //   build: 'cd android && ./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release',
    // },
  },
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 14',
      },
    },
    attached: {
      type: 'android.attached',
      device: {
        adbName: '.*',
      },
    },
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: 'Pixel_6a_API_33',
      },
    },
  },
  configurations: {
    'ios.sim.debug': {
      device: 'simulator',
      app: 'ios.debug',
    },
    'ios.sim.release': {
      device: 'simulator',
      app: 'ios.release',
    },
    'android.att.debug': {
      device: 'attached',
      app: 'android.debug',
    },
    'android.att.release': {
      device: 'attached',
      app: 'android.release',
    },
    'android.emu.debug': {
      device: 'emulator',
      app: 'android.debug',
    },
    'android.emu.release': {
      device: 'emulator',
      app: 'android.release',
    },
  },
};
