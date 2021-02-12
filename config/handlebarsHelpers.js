module.exports = {
    shortDescription: function (content) {
        if(this.content.length > 180) {
            return this.content.substr(0, 180) + '...';
        }
    
        return this;
    }
}