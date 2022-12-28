module.exports = {
    format_time: (date) => {
      return date.toLocaleTimeString();
    },
    format_date: (date) => {
        const month = date.getMonth() + 1
        const day = date.getDay()
        const year = date.getFullYear()

        const dateFormatted = `${month}/${day}/${year}`
      return dateFormatted;
    },
  };
  