class Property < ApplicationRecord
  belongs_to :agent
  has_one :address

  def self.available
    find_by_sql("
      SELECT
        properties.id,
        price,
        beds,
        baths,
        sq_ft,
        ad.city,
        ad.zip,
        ad.street,
        a.first_name,
        a.last_name,
        a.email,
        a.phone,
        a.id AS agent_id
      FROM
        properties
      INNER JOIN agents a ON
        a.id = properties.agent_id
      INNER JOIN addresses ad ON
        ad.property_id = properties.id
      WHERE
        (properties.sold <> TRUE)
      ORDER BY
        agent_id
    ")
  end

  # def self.available
  #   select('properties.id, price, beds, baths, sq_ft,
  #           ad.city, ad.zip, ad.street,
  #           a.first_name, a.last_name, a.email, a.id AS agent_id')
  #   .joins('INNER JOIN agents a ON a.id = properties.agent_id
  #           INNER JOIN addresses ad ON ad.property_id = properties.id')
  #   .where('properties.sold <> TRUE')
  #   .order('a.id')
  # end

  def self.available
    query = <<-SQL
      SELECT
        properties.id,
        price,
        beds,
        baths,
        sq_ft,
        ad.city,
        ad.zip,
        ad.street,
        a.first_name,
        a.last_name,
        a.email,
        a.phone,
        a.id AS agent_id
      FROM
        properties
      INNER JOIN agents a ON
        a.id = properties.agent_id
      INNER JOIN addresses ad ON
        ad.property_id = properties.id
      WHERE
        (properties.sold <> TRUE)
      ORDER BY
      agent_id
    SQL
    ActiveRecord::Base.connection.exec_query(query).map { |r| r}
  end

  def self.by_city(city, y, x)
    find_by_sql(["
      SELECT
        p.id,
        price,
        beds,
        baths,
        sq_ft
      FROM
        properties p
      LEFT JOIN addresses a ON
        a.property_id = p.id
      WHERE
        LOWER(a.city) = ?
        AND p.sold = 'false'
      ", city.downcase, x, y])
  end

  # def self.by_city(city)
  #   select('properties.id, price, beds, baths, sq_ft')
  #   .joins('LEFT JOIN addresses a ON a.property_id = properties.id')
  #   .where('LOWER(a.city) = ? AND properties.sold <> TRUE', city.downcase)
  # end

  def self.by_city(city)
    query = <<-SQL
      SELECT
        p.id,
        price,
        beds,
        baths,
        sq_ft
      FROM
        properties p
      INNER JOIN addresses a ON
        a.property_id = p.id
      WHERE
        LOWER(a.city) = ?
        AND p.sold = 'false'
        SQL
      ActiveRecord::Base.connection.exec_query(sanitize_sql([query, city.downcase])).map { |r| r }
  end

end