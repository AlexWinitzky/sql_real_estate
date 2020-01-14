class Address < ApplicationRecord
  belongs_to :property

  def self.cost_by_city
    find_by_sql("
      SELECT
        DISTINCT city,
        STRING_AGG(CAST(price AS VARCHAR), ', ' ORDER BY price DESC) AS prices_high_to_low,
        COUNT(*) listings,
        (sum(price)/COUNT(*)) AS average
      FROM addresses a
      LEFT JOIN properties p ON a.property_id = p.id
      WHERE (p.sold IS TRUE)
      GROUP BY a.city
      ")
  end
end
