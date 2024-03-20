
log("Selection sort loaded\n\n");

async function startSelectionSort(list, msSpeed) {

    for (var i = 0; i < list.length; i++) {

        let speed = $("#speed").val();

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
}