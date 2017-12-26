
  console.log('start 99 乘法表\n');
  for (let x = 1; x < 10; ++x) {
    for (let y = 1; y < 10; y++) {
      if (y === 1) {
        console.log("\t%s * %s = %s", y, x, (x * y));
      } else {
        console.log("\t%s * %s = %s", y, x, (x * y));
      }
    }
    console.log("\n");
  }
  console.log('end 99 乘法表\n');