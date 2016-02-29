# module Jekyll

#   class CatGen < Generator
  
#     safe true

#     def generate(site)
#        dir = site.config['category_dir'] || 'baa'
#       site.pages.each do |page|
#         begin
#           #build_subpages(site, page.categories[0]+"/subcat", page)
#           site.pages << SubCatPage.new(site, site.source, File.join(dir, category), category)
#         rescue
#           #moo
#         end
#       end
#     end

#     def build_subpages(site, type, posts) 
#       posts[1] = posts[1].sort_by { |p| -p.date.to_f }     
#       atomize(site, type, posts)
#       paginate(site, type, posts)
#     end

#     def atomize(site, type, posts)
#       path = "/#{posts[0]}"
#       atom = AtomCat.new(site, site.source, path, type, posts[0], posts[1])
#       site.pages << atom
#     end

#     def paginate(site, type, posts)
#       pages = Jekyll::Paginate::Pager.calculate_pages(posts[1], site.config['paginate'].to_i)
#       (1..pages).each do |num_page|
#         pager = Jekyll::Paginate::Pager.new(site, num_page, posts[1], pages)
#         path = "/#{posts[0]}"
#         if num_page > 1
#           path = path + "/page#{num_page}"
#         end
#         newpage = GSPCat.new(site, site.source, path, type, posts[0])
#         newpage.pager = pager
#         site.pages << newpage 

#       end
#     end
#   end

#   class SubCatPage < Page
#     def initialize(site, base, dir, category)
#       @site = site
#       @base = base
#       @dir = dir
#       @name = 'index.html'

#       self.process(@name)
#       self.read_yaml(File.join(base, '_layouts'), 'category_index.html')
#       self.data['category'] = category

#       category_title_prefix = site.config['category_title_prefix'] || 'Category: '
#       self.data['title'] = "#{category_title_prefix}#{category}"
#     end
#   end
# end