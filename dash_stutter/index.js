import SceUvp from "./sce-uvp.esm.js"

/**
 * Helper function to load the application
 */
function loadApp() {

  // Register the default dash library
  SceUvp.use('dash');

  // Create an instance of UVP
  var player = new SceUvp.Player('#video-root', {
    src: 'video/start.mpd',
    muted: false,
    autoplay: true,
    controls: {
      skipSec: {
        forward: 5,
        back: 5
      }
    },
    fit: 'contain',
    showControls: true,
    useFullscreenControls: true,
    isControllerTarget: true,
    metadata: {
      primaryText: 'movie title',
      secondaryText: 'secondary text'
    }
  });

  // Listen for any events
  player.on('loadstart', (event) => {
    console.log('Simple Sample - loadstart');
  });

  player.on('loadeddata', (event) => {
    console.log('Simple Sample - loadeddata');

    // Enable some logging in the dashjs player
    player.adapter.player.updateSettings({
      debug: {
        logLevel: 5,
      },
    });
  });

  // Add the video player to the window so we can access it from the inspector
  window.myUvpPlayer = player;
};

window.onload = function () {
  SpatialNavigation.init();
  SpatialNavigation.add({
      selector: '.sce-uvp'
  });
  SpatialNavigation.makeFocusable();
  SpatialNavigation.focus();
}

// Load the application once the page is ready
if (['complete', 'loaded'].includes(document.readyState)) {
  loadApp();
} else {
  document.addEventListener('DOMContentLoaded', loadApp);
}

// Wait for the MediaSDK to be initialized
window.addEventListener('loadedmsdk', () => {
  // Stop the system from Multi-tasking video or playing Background Music
  window.msdk.device.disableSystemMedia().then((result) => {
    console.log(`Disable System Media - result: ${result}`);
  });
});
