
  export default {
    
    async fetch(request) {
      const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
        "Access-Control-Max-Age": "86400",
      };
  
      const DEMO_PAGE = `
        <!DOCTYPE html>
        <html>
        <body>
          <!-- Your HTML code here -->
          HI
    
        </body>
        
        </html>
      `;
   
      async function handleRequest(request, apiUrl) {
        request = new Request(apiUrl, request);
        request.headers.set("Origin", new URL(apiUrl).origin);
        let response = await fetch(request);
        response = new Response(response.body, response);
        
        response.headers.set("Access-Control-Allow-Origin", "*");
        response.headers.append("Vary", "Origin");
        
        return response;
      }
  
      async function handleOptions() {
        return new Response(null, {
          headers: {
            ...corsHeaders,
            "Access-Control-Allow-Headers": "*",
          },
        });
      }
  
      const url = new URL(request.url);
      const PROXY_ENDPOINT = "/corsproxy/";
  
      if (url.pathname.startsWith(PROXY_ENDPOINT)) {
        if (request.method === "OPTIONS") {
          return handleOptions();
        } else if (
          request.method === "GET" ||
          request.method === "HEAD" ||
          request.method === "POST"
        ) {
          let apiUrl;
          const channel = url.searchParams.get("channel");
        
          const API_URL_CHANNEL_1 = "https://www.domain.net/Pages/JobBoard/CurrentOpenings.aspx?o=000-5587-4790-9a5b-00";
          const API_URL_CHANNEL_2 = "https://www.domain.net/Pages/JobBoard/CurrentOpenings.aspx?o=0000-ecc3-439f-87fa-00";
          const API_URL_CHANNEL_3 = ''

    
          if (channel === "1") {
            apiUrl = API_URL_CHANNEL_1; // Replace with your first URL
          } else if (channel === "2") {
            apiUrl = API_URL_CHANNEL_2; // Replace with your second URL
          } else if(channel === "0"){
            apiUrl = url.searchParams.get('freeoption')
          }else{

          
            return new Response("Invalid channel", { status: 400 });
          }
            let mej = handleRequest(request, apiUrl);
          return mej
        } else {
          return new Response(null, {
            status: 405,
            statusText: "Method Not Allowed",
          });
        }
      } else {
        return new Response(DEMO_PAGE, {
          headers: {
            "content-type": "text/html;charset=UTF-8",
          },
        });
      }
    },
  };

function ObjectExists(xmlString) {
    throw new Error("Function not implemented.");
}


function GetBrowserType() {
    throw new Error("Function not implemented.");
}
