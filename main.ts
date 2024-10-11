//TODO: Webview need improve to work with Deno 2, wait this pull request do done, 
//    https://github.com/webview/webview_deno/pull/177/files
//    as a workaround put WebView2Loader.dll under the same folder as the exe or *.ts
import { Webview} from "jsr:@webview/webview";

const html = `
  <html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
      #app { text-align: center; }
      button { margin: 0 10px; padding: 5px 10px; }
    </style>
  </head>
  <body>
    <div id="app"></div>
    <button id="debugButton">Open DevTools</button>
    <script type="module">
      import { h, render } from 'https://esm.sh/preact@10.19.6';
      import { useState } from 'https://esm.sh/preact@10.19.6/hooks';

      function Counter() {
        const [count, setCount] = useState(0);

        return h('div', null, [
          h('h1', null, \`Count: \${count}\`),
          h('button', { onClick: () => setCount(count + 1) }, 'Increment'),
          h('button', { onClick: () => setCount(count - 1) }, 'Decrement')
        ]);
      }

      render(h(Counter), document.getElementById('app'));

            // Debug button functionality
      document.getElementById('debugButton').addEventListener('click', () => {
        // This function will be injected by the Deno Webview
        if (typeof openDevTools === 'function') {
          openDevTools();
        } else {
          console.log('DevTools function not available');
        }
      });
    </script>
  </body>
  </html>
`;

const webview = new Webview();

// Inject the openDevTools function
webview.bind("openDevTools", () => {
  //webview.open_dev_tools();
});

webview.navigate(`data:text/html,${encodeURIComponent(html)}`);
webview.run();