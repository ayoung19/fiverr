chrome.runtime.onMessage.addListener(function (msg) {
    if(msg.type = "start") {
        (function wrapperFunction() {
            // 1st setInterval codeblock below is executed each 2 seconds, checks if there is any Confirm or Exception popup or not, if yes it either clicks on Confirm button And cancel button on exception popup
            setInterval(function () {
                $('[role="dialog"]').find('.layerConfirm').click(); //Clicks on confirm automatically
                jQuery('.uiLayer').remove();
                jQuery('._li._31e').removeClass('_31e'); // Removes exception layer if any
            }, 2000);
            var friendsArr;
            // Initially called once and internally it will call again infinitely as soon as it process visible Add friends elements.
            addFriends(); // executes once
            function addFriends() {
                friendsArr = $('.FriendRequestAdd')
                counter = 0,
                    timer = setInterval(function () {
                        // It triggers click event of add friend button one by one
                        $(friendsArr[counter]).click();
                        counter++
                        // When visible friends are over, loading new friends list
                        if (counter === friendsArr.length) {
                            $(friendsArr).remove(); // Remove old friends blocks
                            // Scrolls to the bottom to load new friends
                            var scrollingElement = (document.scrollingElement || document.body);
                            scrollingElement.scrollTop = scrollingElement.scrollHeight;
                            clearInterval(timer);
                            addFriends(); // Restart the process
                        }
                    }, 4000); // Add friend each 4 seconds.
            }
        })();
    }
});