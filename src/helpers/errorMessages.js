class errorMessages {
    constructor() {
        this.UNKNOWN = 'Something went wrong... why don\'t you debug it?';
        this.UNIQUE_NAME = 'That name already exists. Choose something a little more... unique?';
        this.INVALID_NAME = 'That name doesn\'t exist yet. Why don\'t you add it?';
        this.SAME_PLAYER = 'You\'re not allowed to play yourself... choose another user';
        this.NO_WINNER = 'No winner has been selected.';
        this.NO_NAME_ENTERED = 'Enter a name';
        this.EMPTY = '';
    }
}

export default new errorMessages();