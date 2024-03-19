
log("Selection sort loaded\n\n");

async function startSelectionSort(list, speed, msSpeed) {

    for (var i = 0; i < list.length; i++) {

        // Finding the smallest number in the subarray
        let min = i;
        for (let j = i + 1; j < list.length; j++) {
            if (list[j] < list[min]) {
                min = j;
            }
        }

        if (min != i) {
            // Swapping the elements
            let tmp = list[i];
            list[i] = list[min];
            list[min] = tmp;
        }

        renderList(list);

        await stop(msSpeed / speed);
    }
   

    ////bublle sort
    //for (var i = 0; i < list.length; i++) {

    //    speed = $("#speed").val();

    //    // Last i elements are already in place  
    //    for (var j = 0; j < (list.length - i - 1); j++) {

    //        // Checking if the item at present iteration 
    //        // is greater than the next iteration
    //        if (list[j] > list[j + 1]) {

    //            // If the condition is true
    //            // then swap them
    //            var temp = list[j]
    //            list[j] = list[j + 1]
    //            list[j + 1] = temp
    //        }
    //    }

    //    renderList(list);

    //    await stop(msSpeed / speed);
    //}







}