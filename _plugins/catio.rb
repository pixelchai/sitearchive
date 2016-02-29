module Jekyll
	class DirUp < Liquid::Tag
    	def render(context)
    		super
      		@text = context.environments.first["page"]["url"]
     		return File.dirname(@text)
    	end

	end

	class DirUpEx < Liquid::Tag
		def render(context)
    		super
      		@text = context.environments.first["page"]["url"]
     		return File.basename(File.dirname(@text))
    	end
	end
end#module

Liquid::Template.register_tag('IO_DirUp', Jekyll::DirUp)
Liquid::Template.register_tag('IO_DirUpEx', Jekyll::DirUpEx)