class Api::PropertiesController < ApplicationController
  before_action :set_page

  def index
    properties = Property.available
    paginated = Kaminari.paginate_array(properties).page(@page).per(75)
    total_pages = paginated.total_pages
    render json: { paginated: paginated, total_pages: total_pages }
  end
  
  def city
    properties = Property.by_city(params[:city])
    paginated = Kaminari.paginate_array(properties).page(@page)
    total_pages = paginated.total_pages
    render json: { paginated: paginated, total_pages: total_pages }
  end

  def city_cost
    render json: Address.cost_by_city
  end

  private

  def set_page
    @page = params[:page] || 1
  end
end
