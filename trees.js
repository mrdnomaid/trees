const oneSlice = 0.002000408; // How much of a tree one slice of paper uses, assuming one tree makes 16.67 reams of paper

// As mentioned below, your HP printer may use a different URL scheme, so you may need to change this.
if (window.location.hash.toLowerCase() == '#hid-pgdevinfo') {
    setTimeout(calc, 3000);
} else {
    console.log('Not on a HP printer device info page.')
}

function calc() {
    // This works for the dark-blue UI used on my personal Deskjet 2542. You may need to experiment with class names if you've got a newer HP printer with the green-style UI.
    const trs = document.getElementsByClassName('gui-list-tbl-odd-row');

    let pgcount;
    if (trs[(trs.length - 1)]) {
        pgcount = trs[trs.length - 1].innerHTML;
    } else {
        // If there was no element, check again after 3 seconds.
        setTimeout(calc, 3000);
        pgcount = '0';
    }

    // Relace everything that's not a number with nothing
    const pages = parseInt(pgcount.replace(/[^0-9]/g, ''));
    // Work it out and round it to 2dp
    const felled = parseFloat(pages * oneSlice).toFixed(2);

    // Log it to the console and add it to the table.
    console.log(`You've printed ${pages} slices of paper, felling approximately ${felled} trees.`);
    trs[trs.length - 1].innerHTML += `Approximately ${felled} trees.`;
}
