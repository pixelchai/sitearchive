module Jekyll
	# def GetDir(path)
	# 	puts BANANANANANANNANANANAAAAAAAAAAAa
	# 	return File.dirname(path)
	# end
	class DirUp < Liquid::Tag
		# def initialize(tag_name, text, tokens)
  #   	end

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
    		# puts @text
     		# puts File.basename(File.dirname(@text))
     		return File.basename(File.dirname(@text))
    	end
	end
end

Liquid::Template.register_tag('IO_DirUp', Jekyll::DirUp)
Liquid::Template.register_tag('IO_DirUpEx', Jekyll::DirUpEx)