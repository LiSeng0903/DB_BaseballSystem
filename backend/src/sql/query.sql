SELECT
    GID,
    PAID,
    Hitter,
    PName AS Pitcher,
    Result
FROM
    (
        SELECT
            GID,
            PAID,
            PName AS Hitter,
            Pitcher,
            Result
        FROM
            HitRecord AS H
            INNER JOIN Player AS P ON H.Hitter = P.SID
    ) AS T
    INNER JOIN Player AS Pl ON T.Pitcher = Pl.SID
WHERE
    GID = 6
ORDER BY
    Pitcher,
    Hitter