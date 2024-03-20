
log("Bubble sort loaded\n\n");

async function startBubbleSort(list, msSpeed) {
    //Realiza o sort
    for (var i = 0; i < list.length; i++) {

        let speed = $("#speed").val();

        // Last i elements are already in place  
        for (var j = 0; j < (list.length - i - 1); j++) {

            // Checking if the item at present iteration 
            // is greater than the next iteration
            if (list[j] > list[j + 1]) {

                // If the condition is true
                // then swap them
                var temp = list[j]
                list[j] = list[j + 1]
                list[j + 1] = temp
            }
        }

        renderList(list);

        await stop(msSpeed / speed);
    }
}