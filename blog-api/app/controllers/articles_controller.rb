class ArticlesController < ApplicationController
  before_action :authorize_access_request!, only: [:create, :update, :destroy]
  before_action :set_article, only: [:show, :update, :destroy]

  # GET /articles
  def index
    @articles = Article.includes(:user).all
    if params[:user_id].present?
      @articles.where(user_id: params[:user_id])
    end

    render json: @articles.to_json(include: { user: { only: :name } })
  end

  # GET /articles/1
  def show
    render json: @article.to_json(include: :comments)
  end

  # POST /articles
  def create
    @article = Article.new(article_params)
    @article.user = current_user

    if @article.save
      render json: @article, status: :created, location: @article
    else
      render json: @article.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /articles/1
  def update
    if @article.update(article_params)
      render json: @article
    else
      render json: @article.errors, status: :unprocessable_entity
    end
  end

  # DELETE /articles/1
  def destroy
    if @article.user == current_user
      @article.destroy
    else
      render json: { errors: "Cannot delete" }, status: :bad_request
    end

  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_article
      @article = Article.includes(:comments).find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def article_params
      params.require(:article).permit(:title, :body)
    end
end
