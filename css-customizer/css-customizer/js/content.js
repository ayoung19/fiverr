chrome.storage.local.get("css-customizer-settings", function (result) {
    var settings = result["css-customizer-settings"];
    if (settings) {
        var style = document.createElement("style");
        document.querySelector("head").appendChild(style);
        style.innerHTML = `:root {
                                --main-bg-color: ${settings[0]};
                                --bg-900-color: ${settings[1]};
                                --bg-800-color: ${settings[2]};
                                --bg-700-color: ${settings[3]};
                                --bg-500-blue-color: ${settings[4]};
                                --minor-blue-links: ${settings[5]};
                                --main-txt-color: ${settings[6]};
                                --sec-txt-color: ${settings[7]};
                                --third-txt-color: ${settings[8]};
                                --fourth-txt-color: ${settings[9]};
                                --orange-link-color: ${settings[10]};
                                --mod-red: ${settings[11]};
                                --club-green: ${settings[12]};
                                --msg-purp: ${settings[13]};
                                --msg-pink: ${settings[14]};
                                --msg-dark-blue: ${settings[15]};
                                --msg-lgt-blue: ${settings[16]};
                                --msg-orange: ${settings[17]};
                                --msg-grey: ${settings[18]};
                                --tok-yellow: ${settings[19]};
                                --default-tran: all 0.3s cubic-bezier(.28,.36,.77,.67);
                            }

                            div#header, 
                            body, 
                            frameset frame html body,
                            #movie > div > div{
                                background-color: var(--main-bg-color) !important;
                                background: var(--main-bg-color) !important;
                            }

                            .nav-bar,
                            #header #user_information .bottom,
                            .top-section,
                            #main > div > div:nth-child(2),
                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div > div:nth-child(1) > div,
                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div > div:nth-child(1),
                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1),
                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(3) > div > div:nth-child(1),
                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(4) > div:nth-child(1),
                            #tab-row,
                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(3),
                            .buttons,
                            .video-box,
                            .video-box .title,
                            .altbg,
                            #tag_table .tag_row:nth-child(odd),
                            #main > div > div:nth-child(5) > div:nth-child(3),
                            #main > div > div:nth-child(5) > div:nth-child(5),
                            .message,
                            body #main > div > div:nth-child(5) > div:nth-child(7) > div:nth-child(1) > a[style*="color: rgb(220, 85, 0);"],
                            .suggestionsDiv > a > div:hover,
                            .suggestionsDiv .hashtag_suggestion:hover,
                            .suggestionsDiv > a > div:active,
                            .suggestionsDiv .hashtag_suggestion:active,
                            .suggestionsDiv > a > div:focus,
                            .suggestionsDiv .hashtag_suggestion:focus{
                                background-color: var(--bg-900-color) !important;
                                background: var(--bg-900-color) !important;
                            }

                            #userInfoPanelMenuDropdownRoot div a:hover,
                            #main > div > div:nth-child(5),
                            body #main#tab-row > div[style*="color: rgb(220, 85, 0);"]:not(#settings-tab-default),
                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(2),
                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(4),
                            #main > div > div:nth-child(5),
                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(3),
                            #main > div > div:nth-child(5) > div:nth-child(2),
                            #tag_table .tag_row:nth-child(even),
                            #facebox .popup .content,
                            #main > div > div[data-listener-count-keydown="1"]:last-child > form div:last-child div:last-child div:last-child,
                            .roomElementAnchor,
                            #ucm-header,
                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(2),
                            #id_search_term,
                            #main > div > div:nth-child(5) > div:nth-child(7) > div:nth-child(1),
                            .suggestionsDiv > a > div,
                            .suggestionsDiv .hashtag_suggestion,
                            .login input[type="text"],
                            .login input[type="password"]{
                                background-color: var(--bg-800-color) !important;
                                background: var(--bg-800-color) !important;
                            }

                            #userUpdatesMenuDropdownRoot div,
                            #updates-tab,
                            .info-user .headline .buttons,
                            .table_recent_tips tbody tr th,
                            #tag_table .headers,
                            .jscontextMenu hr,
                            #main > div > div:nth-child(5) > div:nth-child(7) > div:nth-child(1) > a,
                            body #main#tab-row div:not(#settings-tab-default){
                                background-color: var(--bg-700-color) !important;
                                background: var(--bg-700-color) !important;
                            }

                            .tabOverlay span,
                            .bio-container > div > h1,
                            .info-user .headline .buttons li a:hover,
                            #body_border h1,
                            #body_border .title,
                            .login h1{
                                color: var(--main-txt-color) !important;
                            }


                            #header > div.section.clearfix > div.logo-zone > strong,
                            #nav li a,
                            .user_information_header_username,
                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(4) > div:nth-child(1) > form > div:nth-child(1) > div:nth-child(1),
                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(4) > div:nth-child(1) > form > div:nth-child(2) > div:nth-child(1),
                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(4) > div:nth-child(1) > form > div:nth-child(3) > div:nth-child(1),
                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(4) > div:nth-child(1) > form > div:nth-child(4) > div:nth-child(1),
                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(4) > div:nth-child(1) > form > div:nth-child(5) > div:nth-child(1),
                            .advanced_search_options .label,
                            #filter_location_form > label,
                            .bio-container > div *,
                            .bio-container > div > div:nth-child(9) > span:nth-child(2),
                            .paging .endless_separator,
                            #tag_table >.tag_row > span,
                            #body_border #content h2,
                            #ucm-content *,
                            #ucm-content,
                            #ucm-header *,
                            #ucm-name *,
                            #ucm-name,
                            #ucm-header-right *,
                            #ucm-mid *,
                            #ucm-mid,
                            .jscontextMenu p,
                            .jscontextMenu a{
                                color: var(--sec-txt-color) !important;
                            }

                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(4) > div:nth-child(1) > form > div:nth-child(1) > div label,
                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(4) > div:nth-child(1) > form > div:nth-child(2) > div label,
                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(4) > div:nth-child(1) > form > div:nth-child(3) > div label,
                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(4) > div:nth-child(1) > form > div:nth-child(4) > div label,
                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(4) > div:nth-child(1) > form > div:nth-child(5) > div label,
                            .bottom th,
                            .bottom td,
                            .message.dismissable_notice a,
                            #main > div > div:nth-child(2) > div a,
                            .list > li .subject li,
                            #tab-row > div,
                            #ban_container label,
                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(6) > div > div:nth-child(1) > span,
                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2),
                            #main > div > div:nth-child(5) > div:nth-child(5) > span,
                            #main > div > div:nth-child(5) > div:nth-child(3) > span:nth-child(2) > span,
                            .bio-container > div > div:nth-child(11) > span:nth-child(2),
                            .bio-container > div > div:nth-child(12) > span:nth-child(2),
                            div[data-nick] div span:nth-child(2),
                            .settings-list label,
                            .goal_display_table .dark_blue,
                            #maindiv div div div span div table tr td,
                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(6) > div > div:nth-child(3),
                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:last-child,
                            .auip_tokens,
                            #facebox #title,
                            #main > div > div[data-listener-count-keydown="1"]:last-child > div:nth-child(5) span:nth-child(1),
                            #main > div > div[data-listener-count-keydown="1"]:last-child > form *,
                            #body_border #content th,
                            #body_border #content th:after,
                            #body_border #content .terms,
                            #body_border #content strong,
                            #body_border #content footer *,
                            .roomElementAnchor span,
                            .jscontextMenu *,
                            #main > div > div:nth-child(5) > div:nth-child(7) > div:nth-child(1) > a,
                            .suggestionsDiv > a > div > div > p > span,
                            .hashtag_suggestion,
                            .login .username_label,
                            .login .password_label,
                            .login .rememberme_label,
                            .login input[type="text"],
                            .login input[type="password"]{
                                color: var(--third-txt-color) !important;
                            }


                            #userUpdatesMenuDropdownRoot div div div:nth-child(2) div div div div:nth-child(2),
                            .search_input::placeholder,
                            #hashtag_ticker,
                            .endless_page_template > p,
                            .list > li .title .age,
                            .list > li .sub-info li,
                            .advanced_search_options form label,
                            div[data-purecolor="rgb(207, 207, 207)"],
                            #ban_container > p,
                            #body_border p,
                            #body_border li,
                            #cc_button p,
                            .message,
                            .suggestionsDiv > a > div > div > p > div,
                            .searching-keyword p{
                                color: var(--fourth-txt-color) !important;
                            }


                            .sub-nav .active:hover a,
                            #header #user_information a,
                            .message.dismissable_notice a.dismiss_notice_tfa_and_email,
                            .message.dismissable_notice a.dismiss_notice,
                            .advanced_search_options h2,
                            span[data-purecolor="#ff6200"],
                            .bio-container > div > div > span:nth-child(1),
                            #main > div > div[data-listener-count-keydown="1"]:last-child > div:nth-child(5) a,
                            #main div #ucm-name a,
                            #my_collection_list .username,
                            body #main > div > div:nth-child(5) > div:nth-child(7) > div:nth-child(1) > a[style*="color: rgb(220, 85, 0);"],
                            body #main #tab-row > div[style*="color: rgb(220, 85, 0);"]{
                                color: var(--orange-link-color) !important;
                            }


                            #header #user_information #userUpdatesMenuDropdownRoot > div > div > div:nth-child(2) > div > div > div > a,
                            #header #user_information #userUpdatesMenuDropdownRoot > div > div > div:nth-child(2) > div > div > div > div:nth-child(1) > a,
                            #hashtag_ticker a,
                            .advanced_search_button,
                            .advanced_search_region,
                            .hide_advanced_search_button,
                            .list > li .title a,
                            .list > li .subject li a,
                            div[data-purecolor="rgb(207, 207, 207)"] a,
                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(1) > a,
                            #main > div > div:nth-child(6) > div:nth-child(2) > div:nth-child(1) > div:nth-child(6) > div > div:nth-child(2) > a:nth-child(1),
                            #fvm-link,
                            #main > div > div:nth-child(5) > div:nth-child(5) > a,
                            .bio-container > div > div:nth-child(9) > div > span > p:nth-child(2) a,
                            #main > div > div:nth-child(3) > div:nth-child(1) > a:nth-child(1) > span,
                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(6) > div > div:nth-child(2) > a:nth-child(2),
                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div > div:nth-child(1) > div > div:not([data-nick]) a,
                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > span,
                            #defchat > div.section > div.chat-holder > div > div.users-list > div:nth-child(1) > a,
                            .bio-container > div > div:nth-child(1) > a,
                            .footer-holder .footercon div dl dd a,
                            .footer-holder ul:nth-child(3) li a,
                            .footer-holder p a,
                            #tag_table>.tag_row > span a,
                            #body_border p a,
                            #body_border li a,
                            #cc_button p a,
                            #body_border #content .terms a,
                            .message a,
                            .login .nooverlay{
                                color: var(--minor-blue-links) !important;
                            }


                            #userUpdatesMenuDropdownRoot div,
                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(1) > span > div > table,
                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div > div:nth-child(2),
                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(3) > div > div:nth-child(2),
                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(4) > div:nth-child(2),
                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2),
                            #main > div > div:nth-child(5),
                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(3),
                            #main > div > div:nth-child(5) > div:nth-child(3),
                            #main > div > div:nth-child(5) > div:nth-child(5),
                            .collection_header #id_search_term,
                            body #main > div > div:nth-child(5) > div:nth-child(7),
                            .login input[type="text"],
                            .login input[type="password"]{
                                border-color: var(--bg-700-color) !important;
                            }

                            .followedContainer{
                                border-top-color: var(--bg-800-color) !important;
                            }

                            .nav-bar,
                            #main > div > div:nth-child(2),
                            .top-section,
                            #main > div > div:nth-child(3),
                            .list > li .title,
                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(2),
                            #main > div > div:nth-child(5) > div:nth-child(3),
                            #main > div > div:nth-child(5) > div:nth-child(5),
                            #main > div > div:nth-child(5) > div:nth-child(7) > div:nth-child(1),
                            .suggestionsDiv > a > div,
                            .suggestionsDiv > .hashtag_suggestion{
                                border-bottom-color: var(--bg-700-color) !important;
                            }

                            #search_icon div img,
                            #main > div >div:nth-child(3),
                            .ad,
                            #ucm-bottom div img,
                            .jscontextContainer .jscontextLabel img{
                                display: none !important;
                            }

                            .sub-nav li,
                            .suggestionsDiv > a > div,
                            .suggestionsDiv .hashtag_suggestion{
                                cursor: pointer !important;
                            }

                            #userInfoPanelMenuDropdownRoot div a,
                            #main > div > div:nth-child(5) > div:nth-child(7) > div:nth-child(1) > a,
                            .suggestionsDiv > a > div:hover,
                            .suggestionsDiv .hashtag_suggestion:hover{
                                transition: var(--default-tran) !important;
                            }

                            div[data-nick] > div,
                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div > div:nth-child(1) > div > div:not([data-nick]) div,
                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(3) > div > div:nth-child(1) > div > div:not([data-nick]) div,
                            #defchat > div.section > div.chat-holder > div > div.chat-list > div.text > p[style]{
                                background: none !important;
                            }

                            #search_icon{
                                top: 2px !important;
                                margin-right: 15px !important;
                            }

                            #search_icon,
                            #search_icon div{
                                width: auto !important;
                            }

                            #search_icon div:before{
                                content: '';
                                display: inline-block !important;
                                background: url('chrome-extension://__MSG_@@extension_id__/icons/search.svg') !important;
                                background-position: center !important;
                                background-repeat: no-repeat !important;
                                background-size: contain !important; 
                                width: 10px !important;
                                height: 10px !important;
                                margin-right: 5px;
                            }

                            #search_icon div:after{
                                content: 'SEARCH';
                                color: var(--minor-blue-links) !important;
                                font: 13px ubuntumedium,Arial,Helvetica,sans-serif;
                            }

                            .sub-nav a,
                            #main > div > div:nth-child(2) > div > div > a{
                                background: var(--main-bg-color) !important;
                                border-color: var(--bg-700-color) !important;
                                cursor: pointer !important;
                                color: var(--fourth-txt-color) !important;
                                transition: var(--default-tran) !important;
                            }

                            #main > div > div:nth-child(2) > div > div:nth-child(1) > a{
                                background: var(--bg-900-color) !important;
                                border-bottom: none !important;
                                color: var(--third-txt-color) !important;
                            }

                            .sub-nav li:hover a,
                            #main > div > div:nth-child(2) > div > div > a:hover{
                                color: var(--main-txt-color) !important;
                                background: var(--bg-900-color) !important;
                            }

                            .sub-nav .active a{
                                border-bottom: none !important;
                                color: var(--orange-link-color) !important;
                            }

                            #header #user_information,
                            #header #user_information .user_information_header{
                                background: var(--bg-800-color) !important;
                                border-color: var(--bg-800-color) !important;
                            }

                            #header #user_information .user_information_header{
                                width: 99% !important;
                                border-radius: 5px 5px 0px 0px !important;
                            }

                            #userUpdatesMenuDropdownRoot div div div:nth-child(2) div div div{
                                background-color: var(--bg-900-color) !important;
                                border-color: var(--bg-700-color) !important;
                                color: var(--third-txt-color) !important;
                            }

                            #userInfoPanelMenuDropdownRoot div,
                            .followedContainer{
                                background: var(--bg-700-color) !important;
                                border-color: var(--bg-800-color) !important;
                            }

                            .search_input{
                                background-color: var(--bg-800-color) !important;
                                border-color: var(--bg-700-color) !important;
                                color: var(--third-txt-color) !important;
                            }

                            .message.dismissable_notice{
                                background-color: var(--bg-900-color) !important;
                                border: none !important;
                                color: var(--fourth-txt-color) !important;
                            }

                            .subject{
                                margin: 1px 0 3px !important;
                            }

                            #tab-row > #settings-tab-default{
                                background-color: var(--bg-700-color) !important;
                                background-image: url('chrome-extension://__MSG_@@extension_id__/icons/icon-settings.svg') !important;
                                background-repeat: no-repeat !important;
                                background-position: center center !important;
                                background-size: 13px 13px !important;
                            }

                            #tab-row > #settings-tab-default[style*="color: rgb(220, 85, 0);"]{
                                background-color: var(--bg-800-color) !important;
                            }

                            .content .c-1 {
                                margin: 0 20px 0 32px !important;
                            }

                            .tabOverlay{
                                height: 27px !important;
                                background: var(--bg-700-color) !important;
                                border-color: var(--bg-800-color) !important;
                            }

                            .advanced_search_options{
                                background: var(--bg-800-color) !important;
                                border-color: var(--bg-700-color) !important;
                            }

                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(4){
                                padding: 5px !important;
                            }

                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(2){
                                background: var(--bg-800-color) !important;
                                padding-top: 5px !important;
                            }

                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div > div:nth-child(1) > div:not([id="ucm-bottom"]) > div:not([data-nick]) span{
                                color: var(--msg-orange) !important;
                            }
                            
                            div[data-purecolor] span{
                                color: var(--msg-orange);
                                background: transparent;
                            }

                            .color-m,
                            span[data-purecolor="#DC0000"],
                            span[data-listener-count-click][style*="color: rgb(220, 0, 0);"]{
                            color: var(--mod-red) !important;
                            }

                            .color-f,
                            span[data-purecolor="#00ff00"],
                            span[data-listener-count-click][style*="color: rgb(0, 153, 0);"]
                            {
                            color: var(--club-green) !important;
                            }

                            .color-l,
                            span[data-purecolor="#ad62e1"],
                            span[data-listener-count-click][style*="color: rgb(128, 75, 170);"]{
                            color: var(--msg-purp) !important;
                            }

                            .color-p,
                            span[data-purecolor="#d4a0ff"],
                            span[data-listener-count-click][style*="color: rgb(190, 106, 255);"]{
                            color: var(--msg-pink) !important;
                            }

                            .color-tr,
                            span[data-purecolor="#8a98ff"],
                            span[data-listener-count-click][style*="color: rgb(0, 0, 153);"]{
                            color: var(--msg-dark-blue) !important;
                            }

                            .color-t,
                            span[data-purecolor="#84c6dc"],
                            span[data-listener-count-click][style*="color: rgb(102, 153, 170);"]{
                            color: var(--msg-lgt-blue) !important;
                            }

                            span[data-purecolor="#b3b3b3"],
                            span[data-listener-count-click][style*="color: rgb(73, 73, 73);"]{
                            color: var(--msg-grey) !important;
                            }

                            div[data-purecolor="rgb(255, 255, 155)"] > div > span,
                            span.emoticonImage:nth-child(1){
                            color: var(--msg-orange) !important;
                            padding: 3px 0px 3px 0px !important;
                            }


                            #facebox .close{
                                padding: 2px 5px !important;
                                color: var(--fourth-txt-color) !important;
                                border-radius: 50% !important;
                            }

                            div[data-purecolor="rgb(255, 255, 155)"] > div > span,
                            div[data-purecolor="rgb(207, 207, 207)"] > div > span{
                                background: transparent !important;
                                border: none !important;
                                padding: 0 !important;
                            }

                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(1),
                            .bio-container{
                                background-color: var(--bg-900-color) !important;
                                border-color: var(--bg-800-color) !important;
                            }

                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(1) > span > div > table > tr:nth-child(1),
                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(1) > span > div > table > tr:nth-child(3){
                            background: var(--bg-800-color) !important;
                            background-color: var(--bg-800-color) !important;
                            background-image: none !important;
                            }

                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(1) > span > div > table > tr:nth-child(2){
                            background: var(--bg-700-color) !important;
                            background-color: var(--bg-700-color) !important;
                            background-image: none !important;
                            }

                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div > div:nth-child(2),
                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(3) > div > div:nth-child(2),
                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div > div:nth-child(2) > form > input,
                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(3) > div > div:nth-child(2) > form > input,
                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(4) > div:nth-child(2) > form > input,
                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > form > input,
                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(4) > div:nth-child(2),
                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2){
                            background-color: var(--bg-900-color) !important;
                            color: var(--main-txt-color) !important;
                            }

                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(6) > div > span:nth-child(5){
                                background: #45b645 !important;
                            }

                            #main > div > div:nth-child(2) > div:nth-child(2) > div > a[data-floatingnav],
                            #main > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > a{
                                background-color: var(--main-bg-color) !important;
                                color: var(--fourth-txt-color) !important;
                                border: 1px solid var(--bg-700-color) !important;
                                cursor: pointer !important;
                                transition: var(--default-tran) !important;
                            }

                            #main > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > a{
                                color: var(--orange-link-color) !important;
                                border-bottom: none !important;
                            }

                            #main > div > div:nth-child(2) > div:nth-child(2) > div > a[data-floatingnav]:hover{
                                color: var(--main-txt-color) !important;
                                background: var(--bg-900-color) !important;
                            }

                            login .actions li a{
                                background: none;
                            }

                            #main > div > div:nth-child(2) > div:nth-child(1) > a:nth-child(2),
                            .actions > li:nth-child(1) > .nextcam,
                            login .actions li a{
                                background-color: var(--bg-800-color) !important;
                                color: var(--minor-blue-links) !important;
                                border: 1px solid var(--bg-700-color) !important;
                                border-bottom: none !important;
                            }



                            #main > div > div:nth-child(2) > div:nth-child(1) > a:nth-child(1):hover,
                            #main > div > div:nth-child(2) > div:nth-child(1) > a:nth-child(1) > span:hover{
                                text-decoration-color: var(--minor-blue-links) !important;
                            }

                            div[data-purecolor="rgb(207, 207, 207)"] span,
                            div[data-purecolor="rgb(255, 218, 218)"] span{
                            color: var(--msg-orange) !important;
                            background: transparent !important;
                            }




                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div > div:nth-child(1) > div > div:not([data-nick]) > div[style] > div > span[data-listener-count-click]:not([data-purecolor]),
                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(3) > div > div:nth-child(1) > div > div:not([data-nick]) > div[style] > div > span[data-listener-count-click]:not([data-purecolor]){
                            background: var(--bg-800-color) !important;
                            background-color: var(--bg-800-color) !important;
                            color: var(--tok-yellow) !important;
                            border: 1px solid var(--bg-700-color) !important;
                            border-right: none !important;
                            border-radius: 3px 0px 0px 3px !important;
                            padding: 3px 2px 3px 5px !important;
                            display: inline-block !important;
                            margin:3px 0px !important;
                            }

                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div > div:nth-child(1) > div > div:not([data-nick]) > div[style] > div > span[data-listener-count-click]:not([data-purecolor]) + span.emoticonImage,
                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(3) > div > div:nth-child(1) > div > div:not([data-nick]) > div[style] > div > span[data-listener-count-click]:not([data-purecolor]) + span.emoticonImage
                            {
                            background: var(--bg-800-color) !important;
                            background-color: var(--bg-800-color) !important;
                            color: var(--tok-yellow) !important;
                            border: 1px solid var(--bg-700-color) !important;
                            border-left: none !important;
                            border-radius: 0px 3px 3px 0px !important;
                            padding: 3px 5px 3px 2px !important;
                            display: inline-block !important;
                            margin:3px 0px !important;
                            }

                            #tooltip-subject{
                                background: var(--bg-700-color) !important;
                                color: var(--third-txt-color) !important;
                            }

                            
                            .settings-list area{
                                text-decoration-color: var(--minor-blue-links) !important;
                                color: var(--minor-blue-links) !important;
                            }

                            .block{
                                background: var(--bg-800-color) !important;
                                border: 1px solid var(--bg-800-color) !important;
                            }

                            .chat-form .row{
                                padding: 0px !important; 
                            }

                            input#chat_input {
                                background-color: var(--bg-900-color);
                                margin-top: 0 !important;
                                margin-bottom: 0 !important;
                                height: 100% !important;
                                min-height: 25px !important;
                                padding-left: 10px;
                            }

                            .button_send a.send_message_button{
                                background: none !important;
                            }

                            .button_send{
                                background: #FE504D !important;
                                border-radius: 4px !important;
                            }

                            .info-user{
                                border: 1px solid var(--bg-800-color) !important;
                                border-radius: 4px !important;
                            }

                            .info-user .headline{
                                background: var(--bg-700-color) !important;
                                border-radius: 4px 4px 0px 0px !important;
                            }

                            .info-user .headline .buttons li a{
                                background: var(--bg-900-color) !important;
                                color: var(--fourth-txt-color) !important;
                                border: 1px solid var(--fourth-txt-color) !important;
                                border-bottom: none !important;
                            }

                            .info-user .headline .buttons li.active a{
                                background: var(--bg-800-color) !important;
                                color: var(--orange-link-color) !important;
                            }

                            .info-user .memberships_list .sup_cancel_links{
                                color: #FE504D !important;
                            }

                            #main > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(3) > div > div:nth-child(1) > div{
                                background: none !important;
                            }

                            .tabs_content_container .button{
                                background-color: var(--orange-link-color) !important;
                                border: none !important;
                            }

                            .paging .prev,
                            .paging .next{
                                background-color: var(--bg-700-color) !important;
                                color: var(--orange-link-color) !important;
                            }

                            .paging li a.prev{
                                background: url('chrome-extension://__MSG_@@extension_id__/icons/paging-arrow-left.svg') no-repeat 50% 50% !important;
                                background-size: 6px auto !important;
                            }

                            .paging li a.next{
                                background: url('chrome-extension://__MSG_@@extension_id__/icons/paging-arrow-right.svg') no-repeat 50% 50% !important;
                                background-size: 6px auto !important;
                            }

                            .paging .active a{
                                background-color: var(--bg-900-color) !important;
                                color: var(--orange-link-color) !important;
                            }

                            .paging a{
                                background-color: var(--bg-800-color) !important;
                                color: var(--third-txt-color) !important;
                                border: 1px solid var(--bg-700-color) !important;
                                transition: var(--default-tran) !important;
                            }

                            .paging a:hover{
                                background-color: var(--bg-700-color) !important;
                                color: var(--orange-link-color) !important;
                            }

                            .footer-holder{
                                background: var(--bg-900-color) !important;
                                border-top: 2px solid var(--orange-link-color)
                            }

                            .footer-holder .footercon div h2,
                            .footer-holder p,
                            .endless_page_template div:nth-child(3) h2,
                            .endless_page_template .callout,
                            .endless_page_template > span > h1{
                                color: var(--sec-txt-color) !important;
                                text-shadow: none !important;
                            }

                            .footer-holder .nav li a{
                                color: var(--orange-link-color) !important;
                                background: transparent !important;
                            }

                            #tag_table{
                                border: 1px solid var(--orange-link-color) !important;
                                border-radius: 4px !important;
                            }

                            #main > div > div:last-child{
                                background-color: var(--bg-700-color) !important;
                                border: 1px solid var(--orange-link-color) !important;
                            }

                            #main > div > div[data-listener-count-keydown="1"]:last-child > div:nth-child(4){
                                background-color: var(--bg-800-color) !important;
                                color: var(--sec-txt-color) !important;
                                border-radius: 3px 3px 0px 0px !important;
                            }

                            #main > div > div[data-listener-count-keydown="1"]:last-child > div:nth-child(2) div{
                                border-bottom: 8px solid var(--orange-link-color) !important;
                            }

                            #main > div > div[data-listener-count-keydown="1"]:last-child > div:nth-child(2) div div{
                                border-bottom: 5px solid var(--bg-800-color) !important;
                            }

                            #main > div > div[data-listener-count-keydown="1"]:last-child > div:nth-child(3) div{
                                border-right: 8px solid var(--orange-link-color) !important;
                            }

                            #main > div > div[data-listener-count-keydown="1"]:last-child > div:nth-child(3) div div{
                                border-right: 5px solid var(--bg-700-color) !important;
                            }

                            #main > div > div[data-listener-count-keydown="1"]:last-child > div:nth-child(5) span:nth-child(2){
                                color: #4fd44f !important;
                            }

                            #main > div > div[data-listener-count-keydown="1"]:last-child > form textarea{
                                border: 1px solid var(--fourth-txt-color) !important;
                                background-color: var(--bg-800-color) !important;
                            }


                            #main > div > div[data-listener-count-keydown="1"]:last-child > form div:last-child div:last-child div:last-child div{
                                border-color: var(--orange-link-color) !important;
                            }

                            #main > div > div[data-listener-count-keydown="1"]:last-child > form label input{
                                background-color: var(--bg-800-color) !important;
                                color: var(--third-txt-color) !important;
                            }

                            #main > div > div[data-listener-count-keydown="1"]:last-child > form div:last-child div:last-child button:nth-child(1){
                                border-color: var(--bg-800-color) transparent var(--bg-800-color) var(--bg-800-color) !important;
                            }

                            #main > div > div[data-listener-count-keydown="1"]:last-child > form div:last-child div:last-child button:nth-child(2){
                                border: 1px solid var(--bg-800-color) !important;
                            }

                            .password_warning{
                                color: var(--third-txt-color) !important;
                                margin-bottom: 10px !important;
                            }

                            #body_border{
                                background-color: var(--bg-900-color) !important;
                                border-color: var(--bg-700-color) !important;
                            }

                            #cc_button .button,
                            #body_border #content .button{
                                border-color: var(--bg-700-color) !important;
                            }

                            .cc_descriptor_info_tooltip {
                                background-color: var(--bg-800-color) !important;
                                color: var(--third-txt-color) !important;
                                border-color: var(--bg-700-color) !important;
                            }

                            .cc_descriptor_info_tooltip:before{
                                border-right-color: var(--bg-700-color) !important;
                            }

                            #user-context-menu,
                            .jscontextMenu{
                                background-color: var(--bg-800-color) !important;
                                border-color: var(--bg-700-color) !important;
                            }

                            #ucm-bottom *,
                            #ucm-bottom,
                            .jscontextContainer p.jscontextBtn{
                                color: var(--sec-txt-color) !important;
                                transition: var(--default-tran) !important;
                            }

                            .jscontextContainer div.submenu_profile_info a{
                                transition: var(--default-tran) !important;
                            }

                            #ucm-bottom div:hover,
                            .jscontextContainer p.jscontextBtn:hover,
                            .jscontextContainer div.submenu_profile_info a:hover{
                                background-color: var(--bg-700-color) !important;
                                cursor:pointer !important;
                            }

                            #ucm-bottom div{
                                padding: 6px 10px !important;
                            }

                            #ucm-bottom div span{
                                display: inline-block !important;
                            }
                            
                            .jscontextContainer p.pm{
                                background: url('chrome-extension://__MSG_@@extension_id__/icons/pm-svg.svg') no-repeat 5px 6px !important;
                                background-size: 16px auto !important; 
                            }
                            
                            .jscontextContainer p.jscontextBtn {
                                padding: 5px 10px 5px 27px !important;
                            }
                            
                            #ucm-bottom div:nth-child(1) span:before{
                                background: url('chrome-extension://__MSG_@@extension_id__/icons/pm-svg.svg');
                            }
                                
                            #ucm-bottom div:nth-child(2) span:before{
                                background: url('chrome-extension://__MSG_@@extension_id__/icons/ignore.svg');
                            }
                            
                            .jscontextContainer .jscontextBtn:nth-of-type(3){
                                background: url('chrome-extension://__MSG_@@extension_id__/icons/mute.svg') no-repeat 5px 6px !important;
                                background-size: 14px auto !important; 
                            }
                            
                            .jscontextContainer .jscontextBtn:nth-last-of-type(2){
                                background: url('chrome-extension://__MSG_@@extension_id__/icons/ignore.svg') no-repeat 5px 6px !important;
                                background-size: 14px auto !important; 
                            }
                            
                            #ucm-bottom div:nth-child(3) span:before{
                                background: url('chrome-extension://__MSG_@@extension_id__/icons/report.svg');
                            }
                            
                            #ucm-bottom div span:before,
                            .jscontextLabel:nth-last-child(4):before{
                                content: '' !important;
                                width: 14px !important;
                                height: 14px !important;
                                display: inline-block !important;
                                background-position: center !important;
                                background-repeat: no-repeat !important;
                                background-size: contain !important; 
                                margin: 0px 5px -2px 0px!important;
                            }
                            
                            .jscontextContainer div.submenu_profile_info{
                                margin-top: 0px !important;
                            }
                            
                            .jscontextContainer div.submenu_profile_info a{
                                display: inline-block !important;
                                width: calc(100% - 25px) !important;
                                padding: 5px 0px  !important
                            }

                            .jscontextContainer div.submenu_profile_info{
                                display: block !important;
                            }
                            
                            .jscontextContainer div.submenu_profile_info img{
                                margin-bottom: -3px;
                            }
                            
                            .jscontextMenu > div:last-child,
                            .jscontextMenu > div:nth-last-child(2),
                            .jscontextMenu > div:nth-last-child(3){
                                padding-left: 24px !important;
                            }

                            .message{
                                border-color: var(--bg-700-color) !important;
                                border-radius: 4px;
                            }
                            `;
    }
});