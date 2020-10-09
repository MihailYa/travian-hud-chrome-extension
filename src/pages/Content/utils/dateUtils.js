export function formatSeconds(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds - hours * 3600) / 60);
  const seconds = totalSeconds - hours * 3600 - minutes * 60;
  return hours + ':' + padTime(minutes) + ":" + padTime(seconds);
}

export function formatTime(date) {
  return date.getHours() + ':' + padTime(date.getMinutes()) + ':' + padTime(date.getSeconds());
}

function padTime(number) {
  return padding(number, 2, '0');
}

function padding(number, size, paddingSymbol = ' ', isLeftPadding = true) {
  let str = number + '';
  while(str.length < size)
    str = isLeftPadding ? paddingSymbol + str : str + paddingSymbol;

  return str;
}