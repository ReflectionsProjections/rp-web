export const fakeLeaderboardData = Array.from({ length: 200 }, (_, i) => {
  const points = Math.floor(Math.random() * 14) * 15; // 0 to 195 in steps of 15]
  const level = Math.floor(Math.random() * 4); // 0 to 3
  return {
    userId: i,
    name: `User Number ${i + 1}`,
    email: `user${i + 1}@example.com`,
    points,
    isEligibleMerch: {
      base: true,
      first: level >= 1,
      second: level >= 2,
      third: level >= 3
    }
  };
});
