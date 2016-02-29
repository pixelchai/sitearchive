module Jekyll

  class CatGen < Generator
  
    safe true

    def generate(site)
      # site.pages.each do |page|
      #   puts page.subcat
      #   Dir.mkdir page.subcat
      # end
      # no = 0
      site.categories.each do |category|
        # if no % 2 != 0
        puts category[0]
        # puts category[1].length.to_s
        # puts no
        build_subpages(site, "categories", category)
        # end
        # no+= 1
      end
      site.pages.each do |page|
        # build_subpages(site, "subcat", )
      end
    end

    def build_subpages(site, type, posts) 
      posts[1] = posts[1].sort_by { |p| -p.date.to_f }     
      atomize(site, type, posts)
      paginate(site, type, posts)
    end

    def atomize(site, type, posts)
      path = "/#{posts[0]}"
      atom = AtomCat.new(site, site.source, path, type, posts[0], posts[1])
      site.pages << atom
    end

    def paginate(site, type, posts)
      pages = Jekyll::Paginate::Pager.calculate_pages(posts[1], site.config['paginate'].to_i)
      (1..pages).each do |num_page|
        pager = Jekyll::Paginate::Pager.new(site, num_page, posts[1], pages)
        path = "/#{posts[0]}"
        if num_page > 1
          path = path + "/page#{num_page}"
        end
        newpage = GSPCat.new(site, site.source, path, type, posts[0])
        newpage.pager = pager
        site.pages << newpage 

      end
    end
  end

  class GSPCat < Page
    def initialize(site, base, dir, type, val)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), "category_index.html")
      self.data["grouptype"] = type
      self.data[type] = val
    end
  end
  
  class AtomCat < Page
    def initialize(site, base, dir, type, val, posts)
      @site = site
      @base = base
      @dir = dir
      @name = 'rss.xml'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), "cat.xml")
      self.data[type] = val
      self.data["grouptype"] = type
      self.data["posts"] = posts[0..9]
    end
  end
end