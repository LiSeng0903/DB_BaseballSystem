SELECT
    *,
    YEAR(GameDate) AS year,
    MONTH(GameDate) AS 'month',
    DAY(GameDate) AS 'day'
FROM
    Game
WHERE
    MONTH(GameDate) = 6
    AND year(GameDate) = 2022
ORDER BY
    GameDate