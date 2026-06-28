const cells = Array.from(document.getElementsByClassName('tic-tac-toe-cell'));
const btnRefresh = document.getElementById('btn-refresh');

const availableSequences = [
    '1-2-3',
    '4-5-6',
    '7-8-9',
    '1-4-7',
    '2-5-8',
    '3-6-9',
    '1-5-9',
    '3-5-7'
];

const playerOne = 'X';

const playerTwo = 'O';

let currentPlayer = playerOne;
let nextPlayer = playerOne;

const playersCells = {
    [playerOne]: [],
    [playerTwo]: []
}

let winner = null;

cells.forEach(cell => cell.addEventListener('click', e => {
    if (winner === null) {
        const cellNumber = parseInt(cell.getAttribute('number'));

        if (cell.getAttribute('value').length === 0) {
            cell.setAttribute('value', nextPlayer);

            currentPlayer = playerOne;
            let nextPlayerValue = playerOne;
            let cellIcon = "<i class='fa-regular fa-circle'></i>";
            if (nextPlayer === playerOne) {
                currentPlayer = playerTwo;
                nextPlayerValue = playerTwo;
                cellIcon = "<i class='fa-solid fa-xmark'></i>";
            }

            playersCells[currentPlayer].push(cellNumber);
            nextPlayer = nextPlayerValue;
            cell.innerHTML = cellIcon;

            const matchedSequences = availableSequences.filter(sequence => sequence.includes(cellNumber));
            matchedSequences.forEach(matchedSequence => {
                let matchNumbers = 0;

                const matchedSequenceNumbers = matchedSequence.split('-');
                matchedSequenceNumbers.forEach(matchedSequenceNumber => {
                    if (playersCells[currentPlayer].includes(parseInt(matchedSequenceNumber))) {
                        matchNumbers ++;
                    }
                });
                
                if (matchNumbers === 3) {
                    matchedSequenceNumbers.forEach(matchedSequenceNumber => {
                        document.querySelector(`.tic-tac-toe-cell[number="${matchedSequenceNumber}"]`).classList.add('highlight');
                    });
                    winner = currentPlayer;
                    return;
                }
            });
        }
    }
}));

btnRefresh.addEventListener('click', function() {
    location.reload(); // Recarrega a página
});
