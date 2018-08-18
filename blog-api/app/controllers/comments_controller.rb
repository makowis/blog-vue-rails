class CommentsController < ApplicationController
  before_action :authorize_access_request!, only: [:create, :update, :destroy]
  before_action :set_comment, only: [:show, :update, :destroy]

  # GET /articles/:article_id/comments
  def index
    @comments = Comment.where(article_id: params[:article_id])

    render json: @comments
  end

  # GET /comments/1
  def show
    render json: @comment
  end

  # POST /articles/:article_id/comments
  def create
    @comment = Comment.new(comment_params)
    @comment.article = Article.find(params[:article_id])
    @comment.user = current_user

    if @comment.save
      render json: @comment, status: :created
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /comments/1
  def update
    if @comment.update(comment_params)
      render json: @comment
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # DELETE /comments/1
  def destroy
    @comment.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_comment
      @comment = Comment.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def comment_params
      params.require(:comment).permit(:body)
    end
end
